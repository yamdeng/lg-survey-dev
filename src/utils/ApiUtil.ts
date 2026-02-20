import ModalService from '@/services/ModalService';
import { useAppStore } from '@/stores/useAppStore';
import { useUIStore } from '@/stores/useUIStore';
import LoadingBar from '@/utils/LoadingBar';
import axios from 'axios';
import CommonUtil from '@/utils/CommonUtil';

/*

  ajax 구현체 중복 처리 구현
   -disableLoadingBar
   -applyOriginalResponse
   -byPassError

*/

const requestIdList = [];
// const enableLocalDevelop = import.meta.env.VITE_LOCAL_DEVELOP && import.meta.env.VITE_LOCAL_DEVELOP === 'true';

const ApiUtil = axios.create({
  headers: { 'Content-Type': 'application/json' },
  disableLoadingBar: false,
  applyOriginalResponse: false,
  byPassError: false,
} as any);

ApiUtil.defaults.timeout = 1000 * 120;
ApiUtil.defaults.headers.post['Content-Type'] = 'application/json';

// 요청 인터셉터
ApiUtil.interceptors.request.use(
  async (config: any) => {
    const requestId = CommonUtil.getUUID();
    config.requestId = requestId;
    if (!config.disableLoadingBar) {
      requestIdList.push(requestId);
    }

    const { accessToken } = useAppStore.getState();
    if (!useUIStore.getState().displayLoadingBar) {
      if (!config.disableLoadingBar) {
        LoadingBar.show();
      }
    }

    // TODO : 필요시 헤더에 인증 토큰값 반영
    const AuthorizationValue = `Bearer ${accessToken}`;
    config.headers['Authorization'] = AuthorizationValue;

    return config;
  },
  async (error) => {
    const { config } = error;
    if (config && config.requestId) {
      // requestId 삭제
      const deleteIndex = requestIdList.indexOf(config.requestId);
      if (deleteIndex !== -1) {
        requestIdList.splice(deleteIndex, 1);
      }
    }
    LoadingBar.hide();
    return Promise.reject(error);
  },
);

// 응답 인터셉터
ApiUtil.interceptors.response.use(
  (response: any) => {
    if (response.config && response.config.requestId) {
      // requestId 삭제
      const deleteIndex = requestIdList.indexOf(response.config.requestId);
      if (deleteIndex !== -1) {
        requestIdList.splice(deleteIndex, 1);
      }
    }
    if (!response.config.disableLoadingBar && !requestIdList.length) {
      LoadingBar.hide();
    }
    if (response.config.applyOriginalResponse) {
      return response;
    }
    return response.data;
  },
  async (error) => {
    const { config } = error;
    if (config && config.requestId) {
      // requestId 삭제
      const deleteIndex = requestIdList.indexOf(config.requestId);
      if (deleteIndex !== -1) {
        requestIdList.splice(deleteIndex, 1);
      }
    }

    if (!requestIdList.length) {
      LoadingBar.hide();
    }
    const { handleUnauthorizedError, handleAccessDeniedError, handleRefreshAndRetry } =
      useAppStore.getState();
    const errorResponse = error.response || {};
    const errorResponseData = errorResponse.data || {};
    const { message, code } = errorResponseData;
    const status = errorResponse.status;
    if (config.byPassError) {
      return errorResponse;
    }

    // 인증 오류 : 만료토큰시 refresh 반영
    if (status === 401) {
      if (code === 'INVALID_TOKEN') {
        const refreshToken = CommonUtil.getByLocalStorage('refreshToken');
        return handleRefreshAndRetry(errorResponse, refreshToken);
      } else {
        handleUnauthorizedError();
      }
    }

    // 403 에러
    if (status === 403) {
      // TODO : 403 error handle
      handleAccessDeniedError(errorResponse);
      return Promise.reject(error);
    }

    // 네트워크 에러
    if (!error.response || error.message === 'Network Error') {
      ModalService.alert({
        title: '네트워크 오류',
        body: '서버와 연결할 수 없습니다. 네트워크 상태를 확인해주세요.',
      });
      return Promise.reject(error);
    }

    // 타임아웃 처리
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      ModalService.alert({
        title: '요청 시간 초과',
        body: '서버 응답 시간이 너무 길어 요청이 취소되었습니다.',
      });
      return Promise.reject(error);
    }

    // 그외의 오류는 일반적인 오류가 아니므로 테스트가 완료된 case에서는 나오면은 않되는 경우임
    ModalService.alert({ title: 'API ERROR', body: message ? message : 'not message' });

    return Promise.reject(error);
  },
);

export default ApiUtil;
