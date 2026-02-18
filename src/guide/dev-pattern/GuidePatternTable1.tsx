import HeaderMenu from '@/publish/components/headerMenu';
import { createListSlice, listBaseState } from '@/stores/slice/listSlice';
import { useEffect, useState } from 'react';
import { create } from 'zustand';

import { FilePenLine, Home } from 'lucide-react';

import AppSearchInput from '@/components/common/AppSearchInput';
import AppSelect from '@/components/common/AppSelect';
import AppTable from '@/components/common/AppTable';
import FlexBox from '@/publish/components/wrapperItem/FlexBox';
import Code from '@/config/Code';

const initListData = {
  ...listBaseState,
  listApiPath: 'notice',
};

// TODO : 검색 초기값 설정
const initSearchParam = {
  searchWord: '',
  searchType: '',
};

/* zustand store 생성 */
export const GuidePatternTable1Store = create<any>((set, get) => ({
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

function GuidePatternTable1() {
  const listStore = GuidePatternTable1Store();

  const [columns] = useState<any>([
    {
      field: 'boardKey',
      headerName: `게시판 키`,
    },
    { field: 'boardType', headerName: '게시판유형' },
    {
      field: 'boardTitle',
      headerName: '게시판제목',
      width: 120,
      cellStyle: { textAlign: 'center' },
    },
    { field: 'boardContent', headerName: '내용' },
  ]);

  const { enterSearch, searchParam, changeSearchInput, list, clear } = listStore;
  const { searchType, searchWord } = searchParam;

  useEffect(() => {
    clear();
  }, []);

  return (
    <>
      <header className="content-header">
        <FlexBox className="content-inner" justify={'space-between'}>
          <div className="bread-crumb">
            <dl className="bread-crumb-list">
              <dt>
                <a href="/">
                  <Home size={16} />
                </a>
              </dt>
              <dd>
                <a href="#">Notice</a>
              </dd>
            </dl>
          </div>
          <HeaderMenu />
        </FlexBox>
      </header>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <FilePenLine size={18} />
            <h3 className="title-text">Notice</h3>
          </div>
          <div className="content-body">
            <div className="form-block border-none">
              <form>
                <div className="form-inline justify-end">
                  <AppSelect
                    placeholder="제목+내용"
                    // defaultValue="opt-3" // defaultValue 기본값 입력시 에러남
                    style={{ width: 140 }}
                    options={Code.boardSearchType}
                    value={searchType}
                    onChange={(value) => {
                      changeSearchInput('searchType', value);
                    }}
                  />
                  <AppSearchInput
                    placeholder="검색하세요"
                    style={{ width: 400 }}
                    hiddenSearchButton={false}
                    search={enterSearch}
                    value={searchWord}
                    onChange={(value) => {
                      changeSearchInput('searchWord', value);
                    }}
                  />
                </div>
              </form>
            </div>

            <div className="grid-block">
              <div className="grid-block-body">
                <div className="ag-grid">
                  <AppTable rowData={list} columns={columns} store={listStore} rowKey="boardKey" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default GuidePatternTable1;
