import { create } from 'zustand';

export const useConfirmStore = create<any>((set) => ({
  isOpen: false,
  confirmConfig: null,
  showConfirm: (params) => set({ isOpen: true, confirmConfig: params }),
  closeConfirm: () => set({ isOpen: false }),
}));

/**
 * 일반 JS/TS 유틸리티 또는 비즈니스 로직에서 호출할 때 사용
 */
export const confirmActions = {
  show: (params) => useConfirmStore.getState().showConfirm(params),
  close: () => useConfirmStore.getState().closeConfirm(),
};
