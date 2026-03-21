import AppButton from '@/components/common/AppButton';
import AppTable from '@/components/common/AppTable';
import { batchTestData, batchTestData2 } from '@/data/grid/example-data-new';
import { createListSlice, listBaseState } from '@/stores/slice/listSlice';
import CommonUtil from '@/utils/CommonUtil';
import { produce } from 'immer';
import { useEffect } from 'react';
import { create } from 'zustand';

/*

  batch CRUD 개발 패턴 2 : 기존 패턴1을 store로 분리(공통 slice로 사용 가능)

*/

/* zustand store 생성 */

const initListData = {
  ...listBaseState,
};

/* zustand store 생성 */
const testListStore = create<any>((set, get) => ({
  ...createListSlice(set, get),

  ...initListData,

  deletedRows: [],

  // 행 추가
  addRow: (newRow) => {
    const { gridApi } = get();
    gridApi.applyTransaction({
      add: [newRow],
      addIndex: 0, // 맨 위에 추가하고 싶을 때 (생략 시 맨 아래)
    });
  },

  // 선택한 정보 삭제
  deleteSelect: () => {
    const { gridApi, deleteRow } = get();
    const selectedRows = gridApi.getSelectedRows();
    deleteRow(selectedRows);
  },

  // row 삭제 : [] 기준
  deleteRow: (rowsToRemove) => {
    const { gridApi } = get();
    const currentDeletedRows = rowsToRemove
      .filter((row) => row.rowStatus === 'R' || row.rowStatus === 'U')
      .map((row) => ({ ...row, rowStatus: 'D' })); // 상태를 'D'로 변경

    set(
      produce((state: any) => {
        state.deletedRows.unshift(...currentDeletedRows);
      }),
    );

    // 그리드 UI에서 제거
    gridApi.applyTransaction({ remove: rowsToRemove });
  },

  onCellValueChanged: (params) => {
    CommonUtil.onCellValueChanged(params);
  },

  saveBatch: () => {
    const { gridApi, deletedRows } = get();

    const created = [];
    const updated = [];

    // 그리드에 현재 존재하는 노드 순회
    gridApi.forEachNode((node) => {
      const { data } = node;
      if (data.rowStatus === 'A') {
        created.push(data);
      } else if (data.rowStatus === 'U') {
        updated.push(data);
      }
    });

    // 최종 결과물
    const saveData = {
      createList: created, // 추가된 데이터
      updateList: updated, // 수정된 데이터
      deleteList: deletedRows, // 삭제된 데이터 (D 상태)
    };

    console.log('=== 저장 데이터 확인 ===');
    console.log('추가:', saveData.createList);
    console.log('수정:', saveData.updateList);
    console.log('삭제:', saveData.deleteList);
    console.log('전체 전송 객체:', saveData);
  },
}));

/* zustand store 생성 */
const testListStore2 = create<any>((set, get) => ({
  ...createListSlice(set, get),

  ...initListData,

  deletedRows: [],

  // 행 추가
  addRow: (newRow) => {
    const { gridApi } = get();
    gridApi.applyTransaction({
      add: [newRow],
      addIndex: 0, // 맨 위에 추가하고 싶을 때 (생략 시 맨 아래)
    });
  },

  // 선택한 정보 삭제
  deleteSelect: () => {
    const { gridApi, deleteRow } = get();
    const selectedRows = gridApi.getSelectedRows();
    deleteRow(selectedRows);
  },

  // row 삭제 : [] 기준
  deleteRow: (rowsToRemove) => {
    const { gridApi } = get();
    const currentDeletedRows = rowsToRemove
      .filter((row) => row.rowStatus === 'R' || row.rowStatus === 'U')
      .map((row) => ({ ...row, rowStatus: 'D' })); // 상태를 'D'로 변경

    set(
      produce((state: any) => {
        state.deletedRows.unshift(...currentDeletedRows);
      }),
    );

    // 그리드 UI에서 제거
    gridApi.applyTransaction({ remove: rowsToRemove });
  },

  onCellValueChanged: (params) => {
    CommonUtil.onCellValueChanged(params);
  },

  saveBatch: () => {
    const { gridApi, deletedRows } = get();

    const created = [];
    const updated = [];

    // 그리드에 현재 존재하는 노드 순회
    gridApi.forEachNode((node) => {
      const { data } = node;
      if (data.rowStatus === 'A') {
        created.push(data);
      } else if (data.rowStatus === 'U') {
        updated.push(data);
      }
    });

    // 최종 결과물
    const saveData = {
      createList: created, // 추가된 데이터
      updateList: updated, // 수정된 데이터
      deleteList: deletedRows, // 삭제된 데이터 (D 상태)
    };

    console.log('=== 저장 데이터 확인 ===');
    console.log('추가:', saveData.createList);
    console.log('수정:', saveData.updateList);
    console.log('삭제:', saveData.deleteList);
    console.log('전체 전송 객체:', saveData);
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

function GuidePatternTwoListBatchCase3() {
  const listStore = testListStore();
  const listStore2 = testListStore2();

  const { list, setList, addRow, deleteRow, deleteSelect, onCellValueChanged, saveBatch } =
    listStore;

  const {
    list: list2,
    setList: setList2,
    addRow: addRow2,
    deleteRow: deleteRow2,
    deleteSelect: deleteSelect2,
    onCellValueChanged: onCellValueChanged2,
    saveBatch: saveBatch2,
  } = listStore2;

  const columns = [
    {
      field: 'name',
      headerName: '이름',
      flex: 1,
      editable: true,
      cellEditor: 'agTextCellEditor',
    },
    {
      field: 'desc',
      headerName: '설명',
      flex: 1,
      editable: true,
      cellEditor: 'agLargeTextCellEditor',
      cellEditorParams: {
        maxLength: 200, // 최대 글자 수
        rows: 10, // 표시될 행 수
        cols: 50, // 표시될 열 너비
      },
      cellEditorPopup: true,
      cellEditorPopupPosition: 'under',
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
        onDelete: (data) => deleteRow([data]),
      },
    },
  ];

  const columns2 = [
    {
      field: 'name',
      headerName: '이름',
      flex: 1,
      editable: true,
      cellEditor: 'agTextCellEditor',
    },
    {
      field: 'desc',
      headerName: '설명',
      flex: 1,
      editable: true,
      cellEditor: 'agLargeTextCellEditor',
      cellEditorParams: {
        maxLength: 200, // 최대 글자 수
        rows: 10, // 표시될 행 수
        cols: 50, // 표시될 열 너비
      },
      cellEditorPopup: true,
      cellEditorPopupPosition: 'under',
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
        onDelete: (data) => deleteRow2([data]),
      },
    },
  ];

  const handleAddButton = () => {
    const newRow = {
      dataTestId: `temp_${Date.now().toString()}`,
      name: '',
      desc: '',
      active: false,
      userLevel: '',
      mainDisplayYn: 'N',
      rowStatus: 'A',
    };

    addRow(newRow);
  };

  const handleAddButton2 = () => {
    const newRow = {
      dataTestId: `temp_${Date.now().toString()}`,
      name: '',
      desc: '',
      active: false,
      userLevel: '',
      mainDisplayYn: 'N',
      rowStatus: 'A',
    };

    addRow2(newRow);
  };

  const handleTable1RowDoubleClick = (selectedInfo) => {
    // selectedInfo.data
    alert(selectedInfo.data.name);
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
            <h3 className="title-text">2테이블 패턴1 : </h3>
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
                        <AppButton
                          value="추가1"
                          style={{ marginRight: 10 }}
                          onClick={handleAddButton}
                        />
                        <AppButton
                          value="선택삭제1"
                          style={{ marginRight: 10 }}
                          onClick={deleteSelect}
                        />
                        <AppButton value="저장1" onClick={saveBatch} style={{ marginRight: 10 }} />
                      </div>
                    </form>
                  </div>
                  <AppTable
                    tableHeight={500}
                    pageSize={50}
                    rowData={list}
                    store={listStore}
                    columns={columns}
                    editable={true}
                    hiddenPagination={true}
                    stopEditingWhenCellsLoseFocus={true}
                    onCellValueChanged={onCellValueChanged}
                    handleRowDoubleClick={handleTable1RowDoubleClick}
                    rowIdKey="dataTestId"
                  />
                </div>
                <div className="ag-grid" style={{ flex: 1, minWidth: 0 }}>
                  <div className="form-block border-none">
                    <form>
                      <div className="form-inline justify-start">
                        <AppButton
                          value="추가2"
                          style={{ marginRight: 10 }}
                          onClick={handleAddButton2}
                        />
                        <AppButton
                          value="선택삭제2"
                          style={{ marginRight: 10 }}
                          onClick={deleteSelect2}
                        />
                        <AppButton value="저장2" onClick={saveBatch2} style={{ marginRight: 10 }} />
                      </div>
                    </form>
                  </div>
                  <AppTable
                    tableHeight={500}
                    pageSize={50}
                    rowData={list2}
                    store={listStore2}
                    columns={columns2}
                    editable
                    hiddenPagination={true}
                    stopEditingWhenCellsLoseFocus={true}
                    onCellValueChanged={onCellValueChanged2}
                    enableCheckBox
                    rowSelectMode={'multiRow'}
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
export default GuidePatternTwoListBatchCase3;
