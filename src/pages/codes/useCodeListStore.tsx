import ApiService from '@/services/ApiService';
import { createListSlice, listBaseState } from '@/stores/slice/listSlice';
import { create } from 'zustand';

const groupCodeInitListData = {
  ...listBaseState,
  listApiPath: 'common/group-codes',
};

const codeInitListData = {
  ...listBaseState,
  listApiPath: 'common/codes',
};

const groupCodeInitSearchParam = {
  searchWord: '',
  searchType: '',
};

const codeInitSearchParam = {
  searchWord: '',
  searchType: '',
};

/* zustand store 생성 */
export const useGroupCodeListStore = create<any>((set, get) => ({
  ...createListSlice(set, get),

  ...groupCodeInitListData,

  searchParam: {
    ...groupCodeInitSearchParam,
  },

  selectTableRow: (rowInfo) => {
    const { cdGrp } = rowInfo;
    useCodeListStore.getState().searchByGroupCode(cdGrp);
  },

  initSearchInput: () => {
    set({
      searchParam: {
        ...groupCodeInitSearchParam,
      },
    });
  },

  clear: () => {
    set({ ...listBaseState, searchParam: { ...groupCodeInitSearchParam } });
  },
}));

export const useCodeListStore = create<any>((set, get) => ({
  ...createListSlice(set, get),

  ...codeInitListData,

  searchParam: {
    ...codeInitSearchParam,
  },

  searchByGroupCode: async (groupCode) => {
    const apiResult = await ApiService.get(`common/codes/${groupCode}`);
    set({ list: apiResult || [] });
  },

  initSearchInput: () => {
    set({
      searchParam: {
        ...codeInitSearchParam,
      },
    });
  },

  clear: () => {
    set({ ...listBaseState, searchParam: { ...codeInitSearchParam } });
  },
}));
