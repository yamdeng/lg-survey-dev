import { produce } from 'immer';
import ApiService from '@/services/ApiService';
import CommonUtil from '@/utils/CommonUtil';
import ToastService from '@/services/ToastService';
import ModalService from '@/services/ModalService';
import { navigate } from '@/utils/navigation';

export const listBaseState = {
  beforeApiParam: {},
  displayTableLoading: false,
  list: [],
  maxPagingSize: 5,
  currentPage: 1,
  lastPage: 0,
  totalCount: 0,
  prevPage: null,
  nextPage: null,
  displayPageIndexList: [],
  pageSize: 10,
  searchParam: {},
  sortParam: {},
  selectedRowKeys: [],
};

export const createListSlice = (set, get) => ({
  ...listBaseState,

  changeStateProps: (propsName, propsValue) => {
    set({ [propsName]: propsValue });
  },

  changeToSelectedRowKeys: (keys) => {
    set({ selectedRowKeys: keys });
  },

  goFirstPage() {
    const { prevPage } = get();
    if (prevPage) {
      get().changeCurrentPage(1);
    }
  },

  goLastPage() {
    const { nextPage, totalCount, pageSize } = get();
    if (nextPage) {
      get().changeCurrentPage(Math.ceil(totalCount / pageSize));
    }
  },

  changeCurrentPage(currentPage) {
    set({ currentPage: currentPage });
    get().search();
  },

  changePageSize(pageSize) {
    set({ pageSize: pageSize, currentPage: 1 });
    get().search();
  },

  changeLoading: (loading) => {
    set({ displayTableLoading: loading });
  },

  changeSearchInput: (inputName, inputValue) => {
    const { searchParam } = get();
    searchParam[inputName] = inputValue;
    set({ searchParam: searchParam });
  },

  changeSortParam: (sortColumn, sortOrder) => {
    set({ sortParam: { sortColumn: sortColumn, sortOrder: sortOrder } });
    get().search();
  },

  setSearchParam: async (searchParam = {}) => {
    set({ searchParam: searchParam });
  },

  getSearchParam: () => {
    const state = get();
    const apiParam = { ...state.searchParam };
    apiParam.pageNum = state.currentPage;
    apiParam.pageSize = state.pageSize;
    apiParam.sortColumn = state.sortParam.sortColumn;
    apiParam.sortOrder = state.sortParam.sortOrder;
    const applyApiParam = CommonUtil.convertToQueryParams(apiParam);
    set({ beforeApiParam: applyApiParam });
    return applyApiParam;
  },

  getPageParam: () => {
    const state = get();
    const pageParam = {
      pageNum: state.currentPage,
      pageSize: state.pageSize,
    };
    return pageParam;
  },

  // 검색정보 : list, pageable 추출
  setTotalCount(totalCount = 0) {
    const { pageSize, currentPage, maxPagingSize } = get();
    // 최대 보여지는 페이징갯수
    const totalPageSize = Math.ceil(totalCount / pageSize);
    let currentPageStep = Math.floor(currentPage / maxPagingSize);
    if (currentPage % maxPagingSize !== 0) {
      currentPageStep = currentPageStep + 1;
    }
    const pageInfoStartIndex = currentPageStep * maxPagingSize - (maxPagingSize - 1);
    const pageInfoLastIndex =
      currentPageStep * maxPagingSize <= totalPageSize
        ? currentPageStep * maxPagingSize
        : totalPageSize;

    const displayPageIndexList = [];
    for (
      let pageInfoIndex = pageInfoStartIndex;
      pageInfoIndex <= pageInfoLastIndex;
      pageInfoIndex++
    ) {
      displayPageIndexList.push(pageInfoIndex);
    }
    const lastPageStep = Math.ceil(totalPageSize / maxPagingSize);
    const isNextPageStep = currentPageStep < lastPageStep;
    const nextPage = isNextPageStep ? currentPageStep * maxPagingSize + 1 : null;
    const isPrevPageStep = currentPageStep > 1;
    const prevPage = isPrevPageStep ? (currentPageStep - 2) * maxPagingSize + 1 : null;
    set({
      displayPageIndexList: displayPageIndexList,
      prevPage: prevPage,
      nextPage: nextPage,
      lastPage: Math.ceil(totalCount / pageSize),
      totalCount: totalCount,
    });
  },

  search: async () => {
    const {
      listApiPath,
      getSearchParam,
      getCustomSearchParam,
      setTotalCount,
      listApiMethod,
      disablePaging,
      convertList,
      searchAfterAction,
    } = get();
    const applyListApiMethod = listApiMethod || 'get';
    const apiParam = getCustomSearchParam ? getCustomSearchParam() : getSearchParam();
    const apiResult: any = await ApiService[applyListApiMethod](listApiPath, apiParam, {
      disableLoadingBar: false,
    });
    const data = apiResult.data;
    const list = disablePaging ? data : data.list;
    const applyList = convertList ? convertList(list) : list;
    const totalCount = disablePaging && list ? list.length : data.total;
    setTotalCount(totalCount);
    set({ list: applyList || [], selectedRowKeys: [] });
    if (searchAfterAction) {
      searchAfterAction();
    }
  },

  enterSearch: () => {
    set({ currentPage: 1 });
    get().search();
  },

  initSearchInput: () => {
    const { searchParam } = get();
    const resultSearchParam = {};
    if (searchParam) {
      const searchParamKeys = Object.keys(searchParam);
      searchParamKeys.forEach((keyName) => {
        const typeName = typeof searchParam[keyName];
        if (typeName === 'string') {
          resultSearchParam[keyName] = '';
        } else {
          resultSearchParam[keyName] = null;
        }
      });
      set({ searchParam: resultSearchParam });
    }
  },

  getColumns: () => {
    const { columns } = get();
    return columns;
  },

  goDetailPage: (detailId) => {
    const { baseRoutePath } = get();
    navigate(`${baseRoutePath}/${detailId}`);
  },

  goEditPage: (detailId) => {
    const { baseRoutePath } = get();
    navigate(`${baseRoutePath}/${detailId}/edit`);
  },

  goAddPage: () => {
    const { baseRoutePath } = get();
    navigate(`${baseRoutePath}/add/edit`);
  },

  addRow: () =>
    set(
      produce((state: any) => {
        state.list.unshift({
          updated: true,
        });
      }),
    ),

  deleteAll: () => {
    set({ list: [] });
  },

  changeListApiPath: (listApiPath) => {
    set({ listApiPath: listApiPath });
  },

  removeByIndex: (removeIndex) => {
    set(
      produce((state: any) => {
        state.list.splice(removeIndex, 1);
      }),
    );
  },

  removeAll: () => {
    set({ list: [] });
  },

  setList: (newList) => {
    set({ list: newList });
  },

  changeListInfoByIndex: (rowIndex, colId, newValue) => {
    set(
      produce((state: any) => {
        const listInfo = state.list[rowIndex];
        state.list[rowIndex][colId] = '';
        listInfo[colId] = newValue;
        listInfo.updated = true;
      }),
    );
  },

  deleteBySelectedKeys: async () => {
    const { selectedRowKeys, listApiPath, enterSearch } = get();
    if (selectedRowKeys && selectedRowKeys.length) {
      ModalService.confirm({
        body: '선택한 정보를 삭제하시겠습니가?',
        ok: async () => {
          await ApiService.delete(`${listApiPath}`, { data: selectedRowKeys });
          ToastService.success('선택한 정보가 삭제되었습니다.');
          enterSearch();
        },
      });
    }
  },

  clearList: () => {
    set({ ...listBaseState });
  },
});
