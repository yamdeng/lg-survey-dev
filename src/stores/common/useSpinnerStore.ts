import { create } from 'zustand';

export const useSpinnerStore = create<any>((set) => ({
  isLoading: false,

  // 상태 변경 로직
  setIsLoading: (loading) => set({ isLoading: loading }),

  showSpinner: () => set({ isLoading: true }),

  hideSpinner: () => set({ isLoading: false }),
}));

/**
 * 컴포넌트 외부(예: axios interceptor, 일반 함수)에서
 * 호출할 때 사용할 수 있는 Helper 객체입니다.
 */
export const spinnerStore = {
  show: () => useSpinnerStore.getState().showSpinner(),
  hide: () => useSpinnerStore.getState().hideSpinner(),
};
