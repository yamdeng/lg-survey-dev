import { createListSlice, listBaseState } from '@/stores/slice/listSlice';
import { create } from 'zustand';
import { produce } from 'immer';
import * as yup from 'yup';
import CommonUtil from '@/utils/CommonUtil';
import { DATE_PICKER_TYPE_MONTH } from '@/config/CommonConstant';

const todayString = CommonUtil.getNowDateString();

const initListData = {
  ...listBaseState,
  listApiPath: 'notices',
};

const initSearchParam = {
  searchWord: '',
  searchType: '',
  boardType: '',
  startDate: todayString,
  rangeDate: [
    CommonUtil.calculateDate(todayString, 'YYYY-MM-DD', DATE_PICKER_TYPE_MONTH, -1),
    todayString,
  ],
  useYn: 'Y',
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

  changeSearchType: (inputValue) => {
    set(
      produce((draft: any) => {
        draft.searchParam.searchType = inputValue;

        if (inputValue === 'boardContent') {
          draft.searchParam.boardType = 'notice';
        }
      }),
    );
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
