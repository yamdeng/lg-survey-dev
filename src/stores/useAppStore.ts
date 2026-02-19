import ApiService from '@/services/ApiService';
import CommonUtil from '@/utils/CommonUtil';
import LoadingBar from '@/utils/LoadingBar';
import { navigate } from '@/utils/navigation';
import dayjs from 'dayjs';
import { createStore } from 'zustand';
import ApiUtil from '@/utils/ApiUtil';

// 로컬 개발 여부 : 용도는 로컬개발화 sso 분기 처리를 하기위한 변수
// const enableLocalDevelop =
//   import.meta.env.VITE_LOCAL_DEVELOP && import.meta.env.VITE_LOCAL_DEVELOP === 'true';

export const useAppStore = createStore<any>((set, get) => ({
  accessToken: localStorage.getItem('accessToken') || '', // 인증토큰
  refreshToken: localStorage.getItem('refreshToken') || '', // 리프레쉬토큰
  isAuthError: false, // 인증실패 여부 : 로컬 개발일 경우에만 사용

  profile: null,
  isInitComplete: false,
  codeAllList: [],
  codeAllMap: {},

  // TODO : 로그인 정책 나오면 반영
  setLoginToken: (accessToken, refreshToken) => {
    CommonUtil.saveInfoToLocalStorage('accessToken', accessToken);
    CommonUtil.saveInfoToLocalStorage('refreshToken', refreshToken);
    set({ accessToken: accessToken, refreshToken: refreshToken });
  },

  // TODO : 로그인 정책 나오면 반영
  setAccessToken: (accessToken) => {
    set({ accessToken: accessToken });
    CommonUtil.saveInfoToLocalStorage('accessToken', accessToken);
  },

  // TODO : 화면 최초 render전에 필요한 초기정보들을 전부 get 해옴 : 완료시 isInitComplete 값을 true로 바꾸고 true로 바뀐 시점에 사용자에게 보여지는 화면이 render됨
  initApp: async () => {
    LoadingBar.show();
    const { getProfile } = get();

    try {
      await getProfile();
      set({
        isInitComplete: true,
      });
    } catch (e) {
      console.log(e);
    } finally {
      // 자바스크립트, css resource 네트워크 요청시 보여줬던 Loading... hide
      const staticLoadingCheckLayoutDom = document.getElementById('staticLoadingCheckLayout');
      if (staticLoadingCheckLayoutDom && staticLoadingCheckLayoutDom.style) {
        staticLoadingCheckLayoutDom.style.display = 'none';
      }

      LoadingBar.hide();
      const firstPathName = location.pathname;
      const logoutBeforePathName = CommonUtil.getByLocalStorage('logoutBeforePathName');
      // 로그아웃 전에 저장된 location.path이 존재하고 루트 경로가 아닌 경우만 추가 라우팅 체크
      if (logoutBeforePathName && logoutBeforePathName !== '/') {
        // okta에서 받은 url path가 존재하지 않거나 루트 경로일 경우에만 직전 url 체크해서 이동시킴
        if (!firstPathName || firstPathName === '/') {
          navigate(logoutBeforePathName);
        }
      }
      CommonUtil.removeToLocalStorage('logoutBeforePathName');
    }
  },

  getProfile: async () => {
    // TODO : profile api 연동 필요
    const apiResult = await ApiService.get('profile', null, {
      disableLoadingBar: true,
    });
    const data = apiResult.data || {};
    set({ profile: data });

    // DatePicker의 now 반영 기준을 서버 시간으로 반영하기 위한 작업
    const clientNowString = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const serverNowString = data.serverTime;
    const clientDate = dayjs(clientNowString);
    const serverDate = dayjs(serverNowString);
    const diffInSeconds = serverDate.diff(clientDate, 'second');
    CommonUtil.saveInfoToLocalStorage('serverTimeDiffSecondValue', diffInSeconds);
    CommonUtil.saveInfoToLocalStorage('profile', data);
    return data;
  },

  // TODO : 권한 파라미터 정의 필요
  checkAuth: () => {
    const { profile } = get();
    const success = false;
    if (profile) {
      // TODO : 권한 처리
    }
    return success;
  },

  // 400: 요청 오류 (파라미터 잘못됨 등)
  handleBadRequestError: (serverError) => {
    // API에서 내려준 에러 메시지나 기본 메시지 노출
    console.error(serverError);
  },

  // TODO : 401 에러 처리
  handleUnauthorizedError: () => {
    // yamdeng TODO : ModalService 사용
  },

  // TODO : refreshToken 처리
  handleRefreshAndRetry: async (originalRequest, beforeRefreshToken) => {
    const { setLoginToken, handleUnauthorizedError } = get();
    try {
      const apiResult: any = await ApiUtil.post(
        '/api/v1/auth/refresh',
        {
          refreshToken: beforeRefreshToken,
        },
        {
          byPassError: true,
        } as any,
      );
      const { accessToken, refreshToken } = apiResult;
      setLoginToken(accessToken, refreshToken);
      return ApiUtil.request(originalRequest);
    } catch {
      handleUnauthorizedError();
    }
  },

  // TODO : 502, 503, 504(인프라성 장애)
  handleServiceInterrupt: () => {},

  // TODO : 50X 에러 전체를 받아서 판단
  handleGlobalServerError: (status: number) => {
    if ([502, 503, 504].includes(status)) {
      // 인프라 문제 담당 함수 호출
      get().handleServiceInterrupt(status);
    } else {
      // 그 외 서버 오류 담당 함수 호출
      get().handleServerError(status);
    }
  },

  // TODO : 모든 api에서 사전 권한 체크용 api 호출(필요시 사용)
  handleBeforeAuthCheck: async () => {
    return true;
  },

  handleGlobalError: (status: number, message?: string) => {
    switch (status) {
      case 401:
        get().handleUnauthorizedError();
        break;
      case 403:
        get().handleForbiddenError();
        break;
      case 400:
        get().handleBadRequestError(message);
        break;
      case 502:
      case 504:
        get().handleGatewayError();
        break;
      default: // 500 등 기타 처리
    }
  },

  // TODO : 로그아웃 처리
  logout: () => {},
}));
