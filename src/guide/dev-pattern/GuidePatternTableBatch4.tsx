import AppButton from '@/components/common/AppButton';
import AppTable from '@/components/common/AppTable';
import CodeLabelComponent from '@/components/common/CodeLabelComponent';
import { batchTestData } from '@/data/grid/example-data-new';
import { produce } from 'immer';
import CodeService from '@/services/CodeService';
import { useEffect } from 'react';
import { createListSlice, listBaseState } from '@/stores/slice/listSlice';
import { create } from 'zustand';
import CommonUtil from '@/utils/CommonUtil';
import * as Yup from 'yup';

/*

  batch CRUD 개발 패턴 4 : 유효성체크

*/

/* zustand store 생성 */

const listSchema = Yup.array().of(
  Yup.object().shape({
    name: Yup.string().required('이름은 필수 입력 항목입니다.'),
    desc: Yup.string().required('설명은 필수 입력 항목입니다.'),
    userLevel: Yup.string().required('사용자 레벨이 없습니다.'),
  }),
);

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

  saveBatch: async () => {
    const { gridApi, deletedRows, setList } = get();

    const created = [];
    const updated = [];
    const allData = [];

    // 그리드에 현재 존재하는 노드 순회
    gridApi.forEachNode((node) => {
      const { data } = node;
      if (data.rowStatus === 'A') {
        created.push(data);
      } else if (data.rowStatus === 'U') {
        updated.push(data);
      }
      allData.push(data);
    });

    const result = await CommonUtil.applyErrorByList(listSchema, allData);
    const checkedError = result.some((info) => info.isError);

    if (checkedError) {
      setList(result);
      return;
    }

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

function GuidePatternTableBatch4() {
  const listStore = testListStore();

  const { list, setList, addRow, deleteRow, deleteSelect, onCellValueChanged, saveBatch } =
    listStore;

  const codeOptions = CodeService.getOptions('USER_LEVEL', true);
  const codeColumnData = Object.fromEntries(codeOptions.map((item) => [item.value, item.label]));

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
      field: 'active',
      headerName: '활성화 여부',
      editable: true,
      cellDataType: 'boolean', // 타입을 명시하면 체크박스로 렌더링됨
    },
    {
      field: 'userLevel',
      cellEditor: 'agSelectCellEditor',
      editable: true,
      cellEditorParams: { values: codeOptions.map((item) => item.value) },
      refData: codeColumnData,
    },
    {
      field: 'mainDisplayYn',
      headerName: '메인노출여부',
      cellRenderer: CodeLabelComponent,
      cellRendererParams: {
        codeGrpId: 'MAIN_DISPLAY_YN',
      },
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

  useEffect(() => {
    setList(batchTestData);
  }, []);

  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <h3 className="title-text">테이블 batch 패턴 4 : </h3>
          </div>
          <div className="content-body">
            <div className="form-block border-none">
              <form>
                <div className="form-inline justify-start">
                  <AppButton value="추가" style={{ marginRight: 10 }} onClick={handleAddButton} />
                  <AppButton value="선택삭제" style={{ marginRight: 10 }} onClick={deleteSelect} />
                  <AppButton value="저장" onClick={saveBatch} style={{ marginRight: 10 }} />
                </div>
              </form>
            </div>
            <div className="grid-block">
              <div className="grid-block-body">
                <div className="ag-grid">
                  <AppTable
                    tableHeight={500}
                    pageSize={50}
                    rowData={list}
                    store={listStore}
                    columns={columns}
                    editable
                    hiddenPagination={true}
                    stopEditingWhenCellsLoseFocus={true}
                    onCellValueChanged={onCellValueChanged}
                    enableCheckBox
                    rowSelectMode={'multiRow'}
                    rowIdKey="dataTestId"
                    getRowStyle={(params) => {
                      const { data } = params;
                      if (data.isError) {
                        return { background: '#ebb2b2' };
                      }
                    }}
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
export default GuidePatternTableBatch4;
