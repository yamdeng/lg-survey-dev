import { createListSlice, listBaseState } from '@/stores/slice/listSlice';
import { create } from 'zustand';
import * as yup from 'yup';

const initListData = {
  ...listBaseState,
  listApiPath: 'notices',
};

const initSearchParam = {
  searchWord: '',
  searchType: '',
  boardType: '',
};

const yupSearchFormSchema = yup.object().shape({
  boardType: yup.string().required(),
});

/* zustand store 생성 */
export const useGuidePatternListStore = create<any>((set, get) => ({
  ...createListSlice(set, get),

  ...initListData,

  yupSearchFormSchema: yupSearchFormSchema,

  /* TODO : 검색에서 사용할 input 선언 및 초기화 반영 */
  searchParam: {
    ...initSearchParam,
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
