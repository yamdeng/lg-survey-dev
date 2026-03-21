import { useEffect, useState } from 'react';
import { FilePenLine, Search } from 'lucide-react';
import AppSelect from '@/components/common/AppSelect';
import AppButton from '@/components/common/AppButton';
import AppCodeSelect from '@/components/common/AppCodeSelect';
import CodeLabelComponent from '@/components/common/CodeLabelComponent';
import AppTable from '@/components/common/AppTable';
import AppSearchInput from '@/components/common/AppSearchInput';
import { createListSlice, listBaseState } from '@/stores/slice/listSlice';
import { create } from 'zustand';
import NoticeFormModal2 from '@/guide/dev/modal/NoticeFormModal2';

const initListData = {
  ...listBaseState,
  baseRoutePath: '/notices',
  listApiPath: 'notices',
  isOpenFormModal: false,
  listSelectedInfo: null,
};

const initSearchParam = {
  searchWord: '',
  searchType: '',
  boardType: 'notice',
};

/* zustand store 생성 */
export const useNoticeList = create<any>((set, get) => ({
  ...createListSlice(set, get),

  ...initListData,

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

  openModal: (listSelectedInfo) => {
    set({ isOpenFormModal: true, listSelectedInfo: listSelectedInfo });
  },

  closeModal: () => {
    set({ isOpenFormModal: false });
  },

  okModal: async () => {
    const { search } = get();
    set({ isOpenFormModal: false });
    await search();
  },

  clear: () => {
    set({ ...listBaseState, searchParam: { ...initSearchParam } });
  },
}));

/* 목록+폼모달(useImmer + list선택연동) */
function GuidePatternListWidthFormModalCase3() {
  const listStore = useNoticeList();

  const [columns] = useState<any>([
    {
      field: 'boardKey',
      headerName: '게시판 키',
      width: 100,
    },
    {
      field: 'boardType',
      headerName: '게시판 유형',
      width: 120,
    },
    {
      field: 'boardTitle',
      headerName: '게시판 제목',
      minWidth: 200,
      flex: 1, // 남은 공간을 모두 차지하도록 설정
      cellStyle: { fontWeight: 'bold' },
    },
    {
      field: 'boardContent',
      headerName: '내용',
      hide: true, // 목록에서는 숨김 처리 (상세 페이지용 데이터)
    },
    {
      field: 'useYn',
      headerName: '사용 여부',
      width: 100,
      cellStyle: { textAlign: 'center' },
      cellRenderer: CodeLabelComponent,
      cellRendererParams: {
        codeGrpId: 'USE_YN',
      },
    },
    {
      field: 'mainYn',
      headerName: '메인 노출',
      width: 100,
      cellStyle: { textAlign: 'center' },
      cellRenderer: CodeLabelComponent,
      cellRendererParams: {
        codeGrpId: 'MAIN_DISPLAY_YN',
      },
    },
    {
      field: 'boardAuthType',
      headerName: '권한 유형',
      width: 120,
    },
    {
      field: 'securityLevel',
      headerName: '보안 레벨',
      width: 100,
      cellStyle: { textAlign: 'center' },
      cellRenderer: CodeLabelComponent,
      cellRendererParams: {
        codeGrpId: 'USER_LEVEL',
      },
    },
  ]);

  const {
    search,
    searchParam,
    changeSearchInput,
    list,
    isOpenFormModal,
    listSelectedInfo,
    openModal,
    closeModal,
    okModal,
    clear,
  } = listStore;
  const { boardType, searchType, searchWord } = searchParam;

  const handleRowDoubleClick = (selectedInfo) => {
    openModal(selectedInfo.data);
  };

  const handleAddButton = () => {
    openModal();
  };

  useEffect(() => {
    search();
    return () => {
      clear();
    };
  }, []);

  useEffect(() => {
    return clear;
  }, []);
  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <FilePenLine size={18} />
            <h3 className="title-text">공지사항</h3>
          </div>
          <div className="content-body">
            <div className="form-block border-none">
              <form>
                <div className="form-inline justify-end">
                  <AppCodeSelect
                    style={{ width: 150 }}
                    codeGrpId="BOARD_TYPE"
                    value={boardType}
                    onChange={(value) => {
                      changeSearchInput('boardType', value);
                    }}
                  />
                  <AppSelect
                    style={{ width: 150 }}
                    allValue=""
                    allLabel="전체"
                    applyAllSelect
                    options={[
                      { label: '제목', value: 'boardTitle' },
                      { label: '내용', value: 'boardContent' },
                    ]}
                    value={searchType}
                    onChange={(value) => {
                      changeSearchInput('searchType', value);
                    }}
                  />
                  <AppSearchInput
                    placeholder="검색하세요"
                    style={{ width: 400 }}
                    value={searchWord}
                    onChange={(value) => {
                      changeSearchInput('searchWord', value);
                    }}
                    search={search}
                  />
                  <AppButton
                    style={{ marginLeft: 10 }}
                    icon={<Search size={18} />}
                    value="조회"
                    onClick={search}
                  />
                  <AppButton style={{ marginLeft: 10 }} value="등록" onClick={handleAddButton} />
                </div>
              </form>
            </div>
            <div className="grid-block">
              <div className="grid-block-body">
                <div className="ag-grid">
                  <AppTable
                    rowData={list}
                    columns={columns}
                    handleRowDoubleClick={handleRowDoubleClick}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <NoticeFormModal2
          isOpen={isOpenFormModal}
          okModal={okModal}
          closeModal={closeModal}
          detailId={listSelectedInfo?.boardKey}
        />
      </main>
    </>
  );
}
export default GuidePatternListWidthFormModalCase3;
