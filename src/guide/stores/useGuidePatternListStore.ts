import { createListSlice, listBaseState } from '@/stores/slice/listSlice';
import { create } from 'zustand';

const initListData = {
  ...listBaseState,
  listApiPath: 'notices',
};

const initSearchParam = {
  searchWord: '',
  searchType: '',
};

/* zustand store 생성 */
export const useGuidePatternListStore = create<any>((set, get) => ({
  ...createListSlice(set, get),

  ...initListData,

  /* TODO : 검색에서 사용할 input 선언 및 초기화 반영 */
  searchParam: {
    searchWord: '',
  },

  initSearchInput: () => {
    set({
      searchParam: {
        ...initSearchParam,
      },
    });
  },

  clear: () => {
    set({ ...listBaseState, searchParam: { ...initSearchParam } });
  },
}));
