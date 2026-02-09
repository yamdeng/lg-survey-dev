import ModalService from '@/services/ModalService';
import { useAppStore } from '@/stores/useAppStore';
import { useUIStore } from '@/stores/useUIStore';
import LoadingBar from '@/utils/LoadingBar';
import axios from 'axios';
import CommonUtil from './CommonUtil';

/*

  ajax 구현체 중복 처리 구현
   -disableLoadingBar
   -applyOriginalResponse
   -byPassError
   -errorMessageByDataProperty
   -byPassApiAuthCheck

*/

const requestIdList = [];
// const enableLocalDevelop = import.meta.env.VITE_LOCAL_DEVELOP && import.meta.env.VITE_LOCAL_DEVELOP === 'true';

const ApiUtil = axios.create({
  headers: { 'Content-Type': 'application/json' },
  disableLoadingBar: false,
  applyOriginalResponse: false,
  byPassError: false,
  errorMessageByDataProperty: false,
  byPassApiAuthCheck: false,
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

    const { accessToken, handleBeforeAuthCheck } = useAppStore.getState();
    if (!useUIStore.getState().displayLoadingBar) {
      if (!config.disableLoadingBar) {
        LoadingBar.show();
      }
    }

    // TODO : 필요시 헤더에 인증 토큰값 반영
    const AuthorizationValue = `${accessToken}`;
    config.headers['Authorization'] = AuthorizationValue;

    if (!config.byPassApiAuthCheck) {
      await handleBeforeAuthCheck();
    }
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
    const responseData = response.data;
    const responseHeader = response.headers;
    if (!response.config.byPassError) {
      // TODO : http 응답 코드가 정상일 경우 에러 처리를 해야하는 경우 반영(필요시 반영)
      // ModalService.alert({ body: applyErrorMessage });
      // return Promise.reject({
      //   errorType: 'api',
      //   message: applyErrorMessage,
      //   config: response.config,
      // });
    }
    if (response.config.applyOriginalResponse) {
      return response;
    }
    return response.data;
  },
  async (error) => {
    const { config, code } = error;
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
    const { handleUnauthorizedError, handleAccessDeniedError } = useAppStore.getState();
    const errorResponse = error.response || {};
    const status = errorResponse.status;

    // 인증 오류
    if (status === 401) {
      handleUnauthorizedError(errorResponse);
      return Promise.reject(error);
    }

    // 403 에러
    if (status === 403) {
      // TODO : 403 error handle
      handleAccessDeniedError();
      return Promise.reject(error);
    }

    if (code && code === 'ECONNABORTED') {
      ModalService.alert({ body: 'server api timeout error' });
    } else {
      // 그외의 오류는 일반적인 오류가 아니므로 테스트가 완료된 case에서는 나오면은 않되는 경우임
      ModalService.alert({ body: status === 404 ? 'api not found' : 'server error' });
    }

    return Promise.reject(error);
  },
);

export default ApiUtil;
