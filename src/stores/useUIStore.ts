import { createStore } from 'zustand';
import { navigate } from '@/utils/navigation';

export const useUIStore = createStore<any>((set, get) => ({
  displayLoadingBar: false,
  currentPath: '',
  beforePath: '',
  lastErrorMessage: '',
  lastSourceUrl: '',

  displayLeftMenu: false /* 좌측 메뉴 영역 펼쳤을때 영역 display */,
  selectedMenuKeys: [] /* 좌측 메뉴 선택된 키 목록 */,

  // 메뉴 토글
  toggleLeftMenu: () => {
    const { displayLeftMenu } = get();
    set({ displayLeftMenu: displayLeftMenu ? false : true });
  },

  changeSelectedMenuKeys: (menuKeys) => {
    set({ selectedMenuKeys: menuKeys });
  },

  // 에러가 두번 호출되는 경우가 있어서 똑같은 에러는 중복처리 하지 않기위한 인터페이스
  changeErrorInfo: (message, sourceUrl) => {
    set({ lastErrorMessage: message, lastSourceUrl: sourceUrl });
  },

  // 페이지 reload
  reloadApp: () => {
    location.href = '/';
  },

  // RouteChecker.tsx에서 사용되고 라우팅이 이동될때마다 반영
  changeCurrentPath: (path) => {
    const { currenPath } = get();
    set({ currentPath: path, beforePath: currenPath });
  },

  // 로딩바 display 여부 변경
  setDisplayLoadingBar: (displayLoadingBar) => {
    set(() => ({ displayLoadingBar: displayLoadingBar }));
  },

  goHome: () => {
    navigate('/');
  },
}));
