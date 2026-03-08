import AppButton from '@/components/common/AppButton';
import AppTable from '@/components/common/AppTable';
import CodeLabelComponent from '@/components/common/CodeLabelComponent';
import CodeService from '@/services/CodeService';
import Config from '@/config/Config';
import { useRef, useState } from 'react';

/*

  기본 에디팅 input 사용방법
   1.[추가] 버튼 클릭시 행 추가
   2.[삭제] 선택한 정보 행 삭제
   3.액션 버튼의 [삭제] 버튼 클릭시 행 삭제

*/

const tempData = [
  {
    dataTestId: '1',
    name: 'test1',
    age: 10,
    desc: '',
    status: '대기',
    cityCode: 'SEO',
    active: false,
    userLevel: '9',
    mainDisplayYn: 'Y',
    rowStatus: 'R',
  },
  {
    dataTestId: '2',
    name: 'test2',
    age: 11,
    desc: '설명2',
    status: '진행중',
    cityCode: 'SEO',
    active: false,
    userLevel: '9',
    mainDisplayYn: 'Y',
    rowStatus: 'R',
  },
  {
    dataTestId: '3',
    name: 'test3',
    age: 30,
    desc: 'ㅁㅁㅁ',
    status: '대기',
    cityCode: 'ICN',
    active: false,
    userLevel: '7',
    mainDisplayYn: 'Y',
    rowStatus: 'R',
  },
  {
    dataTestId: '4',
    name: 'test4',
    age: 40,
    desc: '',
    status: '대기',
    cityCode: 'ICN',
    active: false,
    userLevel: '6',
    mainDisplayYn: 'N',
    rowStatus: 'R',
  },
  {
    dataTestId: '5',
    name: 'test5',
    age: 50,
    desc: '',
    status: '완료',
    cityCode: 'ICN',
    active: false,
    userLevel: '9',
    mainDisplayYn: 'Y',
    rowStatus: 'R',
  },
];

const ActionButtons = (params) => {
  const onDeleteRow = () => {
    params.api.applyTransaction({ remove: [params.data] });
  };

  return (
    <div className="btn-group">
      <button className="app-btn primary small" onClick={onDeleteRow}>
        삭제
      </button>
    </div>
  );
};

function GuideTableBatchAddDelete() {
  const gridApiRef = useRef<any>(null);
  const [rowData, setRowData] = useState(tempData);

  const codeOptions = CodeService.getOptions('USER_LEVEL');
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
    },
  ];

  const getGridRef = (event) => {
    // 외부에서 api 인스턴스를 직접 사용하고 싶을 경우에 사용
    gridApiRef.current = event.api;
  };

  const save = () => {
    const allData = [];

    // 방법 1: API를 통해 모든 행 데이터 수집 (가장 확실함)
    gridApiRef.current.forEachNode((node) => {
      allData.push(node.data);
    });

    console.log(allData);
  };

  const addRow = () => {
    const currentData = [];
    // 1. 현재 그리드에 있는 (수정된) 모든 데이터를 뽑아옴
    gridApiRef.current.forEachNode((node) => {
      currentData.push(node.data);
    });

    // 2. 새 로우 객체 생성
    const newRow = {
      dataTestId: `temp_${Date.now().toString()}`,
      name: '',
      desc: '',
      active: false,
      userLevel: '',
      mainDisplayYn: 'N',
    };

    // 3. 기존 데이터 + 새 데이터를 합쳐서 State 업데이트
    const newRowData = [newRow, ...currentData];
    setRowData(newRowData);

    // 마지막에 추가하고 싶을때
    // setRowData([...currentData, newRow]);
  };

  const addRow2 = () => {
    const newRow = {
      dataTestId: `temp_${Date.now().toString()}`,
      name: '',
      desc: '',
      active: false,
      userLevel: '',
      mainDisplayYn: 'N',
    };

    // State를 건드리지 않고 그리드에 직접 행을 추가합니다.
    // 이 명령을 실행해도 기존 셀에 타이핑 중이던 데이터는 그대로 유지됩니다.
    gridApiRef.current.applyTransaction({
      add: [newRow],
      addIndex: 0, // 맨 위에 추가하고 싶을 때 (생략 시 맨 아래)
    });
  };

  const deleteSelect = () => {
    const selectedRows = gridApiRef.current.getSelectedRows();
    gridApiRef.current.applyTransaction({ remove: selectedRows });
  };

  const onCellValueChanged = (params) => {
    const { data, newValue, colDef, node } = params;
    console.log(`${colDef.field} 필드가 ${newValue}로 변경됨!`);
    console.log('업데이트된 행 데이터:', data);
    if (!data.rowStatus || data.rowStatus === 'R') {
      // setDataValue 를 사용하기 위해서는 rowStatus로 filed 가 정의되어야 함
      // node.setDataValue('rowStatus', 'U');
      // {
      //   field: 'rowStatus',
      //   hide: true, // 화면에는 보이지 않게 설정
      // },

      const updatedData = {
        ...data,
        rowStatus: 'U',
      };

      // 2. node.setData를 통해 행 데이터 전체를 업데이트
      node.setData(updatedData);
      console.log('rowStatus U!!!');
    }
  };

  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <h3 className="title-text">
              table batch 행추가/삭제 :{' '}
              <a
                style={{ fontSize: 20 }}
                href={Config.hrefBasePath + `dev/table/GuideTableBatchAddDelete.tsx`}
              >
                GuideTableBatchAddDelete
              </a>
            </h3>
          </div>
          <div className="content-body">
            <div className="form-block border-none">
              <form>
                <div className="form-inline justify-start">
                  <AppButton value="추가1" style={{ marginRight: 10 }} onClick={addRow} />
                  <AppButton value="추가2" style={{ marginRight: 10 }} onClick={addRow2} />
                  <AppButton value="선택삭제" style={{ marginRight: 10 }} onClick={deleteSelect} />
                  <AppButton value="저장" onClick={save} style={{ marginRight: 10 }} />
                </div>
              </form>
            </div>
            <div className="grid-block">
              <div className="grid-block-body">
                <div className="ag-grid">
                  <AppTable
                    tableHeight={500}
                    pageSize={50}
                    rowData={rowData}
                    getGridRef={getGridRef}
                    columns={columns}
                    editable
                    hiddenPagination
                    undoRedoCellEditing={true}
                    stopEditingWhenCellsLoseFocus={true}
                    onCellValueChanged={onCellValueChanged}
                    enableCheckBox
                    rowSelectMode={'multiRow'}
                    getRowId={(params) => params.data.dataTestId}
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
export default GuideTableBatchAddDelete;
