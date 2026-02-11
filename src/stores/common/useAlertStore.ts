import { create } from 'zustand';

export const useAlertStore = create<any>((set) => ({
  isOpen: false,
  alertConfig: null,
  showAlert: (params) => set({ isOpen: true, alertConfig: params }),
  closeAlert: () => set({ isOpen: false }),
}));

// ★ 일반 유틸리티(JS/TS)에서 사용할 수 있는 전역 액션
export const alertActions = {
  showAlert: (params) => useAlertStore.getState().showAlert(params),
  closeAlert: () => useAlertStore.getState().closeAlert(),
};
