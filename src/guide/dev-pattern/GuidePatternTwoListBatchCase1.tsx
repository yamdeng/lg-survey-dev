import AppButton from '@/components/common/AppButton';
import AppTable from '@/components/common/AppTable';
import { batchTestData, batchTestData2 } from '@/data/grid/example-data-new';
import { createListSlice, listBaseState } from '@/stores/slice/listSlice';
import { produce } from 'immer';
import { useEffect } from 'react';
import { create } from 'zustand';

/*

  테이블간 선택 행 이동 case

*/

/* zustand store 생성 */

const initListData = {
  ...listBaseState,
};

/* zustand store 생성 */
const testListStore = create<any>((set, get) => ({
  ...createListSlice(set, get),

  ...initListData,

  deleteRow: (rowInfo) => {
    const { list } = get();
    set(
      produce((state: any) => {
        state.list = list.filter((info) => info.dataTestId !== rowInfo.dataTestId);
      }),
    );
  },

  save: () => {
    const { list } = get();
    console.log('=== 저장 데이터 확인 list1 ===');
    console.log(list);
  },
}));

/* zustand store 생성 */
const testListStore2 = create<any>((set, get) => ({
  ...createListSlice(set, get),

  ...initListData,

  deleteRow: (rowInfo) => {
    const { list } = get();
    set(
      produce((state: any) => {
        state.list = list.filter((info) => info.dataTestId !== rowInfo.dataTestId);
      }),
    );
  },

  save: () => {
    const { list } = get();
    console.log('=== 저장 데이터 확인 list2 ===');
    console.log(list);
  },
}));

const ActionButtons = (params) => {
  // params 내부에 cellRendererParams로 전달한 onDelete가 들어있습니다.
  const { onDelete, data } = params;

  const onDeleteRow = () => {
    onDelete(data);
  };

  return (
    <div className="btn-group">
      <button className="app-btn primary small" onClick={onDeleteRow}>
        삭제
      </button>
    </div>
  );
};

function GuidePatternTwoListBatchCase1() {
  const listStore = testListStore();
  const listStore2 = testListStore2();

  const { list, setList, addRow, deleteRow, save, removeByIndex } = listStore;

  const {
    list: list2,
    setList: setList2,
    addRow: addRow2,
    deleteRow: deleteRow2,
    save: save2,
    removeByIndex: removeByIndex2,
  } = listStore2;

  const columns = [
    {
      field: 'name',
      headerName: '이름',
      flex: 1,
    },
    {
      field: 'desc',
      headerName: '설명',
      flex: 1,
    },
    {
      field: 'action',
      headerName: '관리',
      minWidth: 150, // 버튼이 잘리지 않게 넉넉히 설정
      cellRenderer: ActionButtons, // 커스텀 컴포넌트 연결
      sortable: false, // 액션 컬럼은 정렬이 필요 없음
      filter: false, // 필터 제외
      resizable: false, // 크기 조절 방지 (선택 사항)
      pinned: 'right', // 우측에 고정 (데이터가 많을 때 유용)
      cellRendererParams: {
        onDelete: (data) => deleteRow(data),
      },
    },
  ];

  const columns2 = [
    {
      field: 'name',
      headerName: '이름',
      flex: 1,
    },
    {
      field: 'desc',
      headerName: '설명',
      flex: 1,
    },
    {
      field: 'action',
      headerName: '관리',
      minWidth: 150, // 버튼이 잘리지 않게 넉넉히 설정
      cellRenderer: ActionButtons, // 커스텀 컴포넌트 연결
      sortable: false, // 액션 컬럼은 정렬이 필요 없음
      filter: false, // 필터 제외
      resizable: false, // 크기 조절 방지 (선택 사항)
      pinned: 'right', // 우측에 고정 (데이터가 많을 때 유용)
      cellRendererParams: {
        onDelete: (data) => deleteRow2(data),
      },
    },
  ];

  const handleTable1RowDoubleClick = (selectedInfo) => {
    const { data, rowIndex } = selectedInfo;
    // listStore에 정보 삭제
    // listStore2에 정보 add
    removeByIndex(rowIndex);
    addRow2(data);
  };

  const handleTable2RowDoubleClick = (selectedInfo) => {
    const { data, rowIndex } = selectedInfo;
    // listStore에 정보 삭제
    // listStore2에 정보 add
    removeByIndex2(rowIndex);
    addRow(data);
  };

  useEffect(() => {
    setList(batchTestData);
    setList2(batchTestData2);
  }, []);

  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <h3 className="title-text">테이블간 선택 행 이동 case : </h3>
          </div>
          <div className="content-body">
            <div className="grid-block">
              <div
                className="grid-block-body"
                style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}
              >
                <div className="ag-grid" style={{ flex: 1, minWidth: 0 }}>
                  <div className="form-block border-none">
                    <form>
                      <div className="form-inline justify-start">
                        <AppButton value="저장1" onClick={save} style={{ marginRight: 10 }} />
                      </div>
                    </form>
                  </div>
                  <AppTable
                    tableHeight={500}
                    pageSize={50}
                    rowData={list}
                    store={listStore}
                    columns={columns}
                    hiddenPagination={true}
                    handleRowDoubleClick={handleTable1RowDoubleClick}
                    rowIdKey="dataTestId"
                  />
                </div>
                <div className="ag-grid" style={{ flex: 1, minWidth: 0 }}>
                  <div className="form-block border-none">
                    <form>
                      <div className="form-inline justify-start">
                        <AppButton value="저장2" onClick={save2} style={{ marginRight: 10 }} />
                      </div>
                    </form>
                  </div>
                  <AppTable
                    tableHeight={500}
                    pageSize={50}
                    rowData={list2}
                    store={listStore2}
                    columns={columns2}
                    hiddenPagination={true}
                    handleRowDoubleClick={handleTable2RowDoubleClick}
                    rowIdKey="dataTestId"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default GuidePatternTwoListBatchCase1;
