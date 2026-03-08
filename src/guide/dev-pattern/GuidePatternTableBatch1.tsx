import AppButton from '@/components/common/AppButton';
import AppTable from '@/components/common/AppTable';
import CodeLabelComponent from '@/components/common/CodeLabelComponent';
import CodeService from '@/services/CodeService';
import { useRef, useState } from 'react';

/*

  batch CRUD 개발 패턴 1 : store를 사용하지 않는 버전

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
  {
    dataTestId: '6',
    name: 'test6',
    age: 50,
    desc: '',
    status: '완료',
    cityCode: 'ICN',
    active: false,
    userLevel: '9',
    mainDisplayYn: 'Y',
    rowStatus: 'R',
  },
  {
    dataTestId: '7',
    name: 'test7',
    age: 50,
    desc: '',
    status: '완료',
    cityCode: 'ICN',
    active: false,
    userLevel: '9',
    mainDisplayYn: 'Y',
    rowStatus: 'R',
  },
  {
    dataTestId: '8',
    name: 'test8',
    age: 50,
    desc: '',
    status: '완료',
    cityCode: 'ICN',
    active: false,
    userLevel: '9',
    mainDisplayYn: 'Y',
    rowStatus: 'R',
  },
  {
    dataTestId: '9',
    name: 'test9',
    age: 50,
    desc: '',
    status: '완료',
    cityCode: 'ICN',
    active: false,
    userLevel: '9',
    mainDisplayYn: 'Y',
    rowStatus: 'R',
  },
  {
    dataTestId: '10',
    name: 'test10',
    age: 50,
    desc: '',
    status: '완료',
    cityCode: 'ICN',
    active: false,
    userLevel: '9',
    mainDisplayYn: 'Y',
    rowStatus: 'R',
  },
  {
    dataTestId: '11',
    name: 'test11',
    age: 50,
    desc: '',
    status: '완료',
    cityCode: 'ICN',
    active: false,
    userLevel: '9',
    mainDisplayYn: 'Y',
    rowStatus: 'R',
  },
  {
    dataTestId: '12',
    name: 'test12',
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
  // params 내부에 cellRendererParams로 전달한 onDelete가 들어있습니다.
  const { onDelete, data } = params;

  const onDeleteRow = () => {
    if (onDelete) {
      // 부모에서 정의한 공통 삭제 로직(processDelete) 호출
      onDelete(data);
    } else {
      // 예외 케이스 대비용 기본 동작
      params.api.applyTransaction({ remove: [data] });
    }
  };

  return (
    <div className="btn-group">
      <button className="app-btn primary small" onClick={onDeleteRow}>
        삭제
      </button>
    </div>
  );
};

function GuidePatternTableBatch1() {
  const gridApiRef = useRef<any>(null);
  const [rowData] = useState(tempData);
  const [deletedRows, setDeletedRows] = useState([]);

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
      cellRendererParams: {
        onDelete: (data) => processDelete([data]),
      },
    },
  ];

  const getGridRef = (event) => {
    // 외부에서 api 인스턴스를 직접 사용하고 싶을 경우에 사용
    gridApiRef.current = event.api;
  };

  // 2. 삭제 처리 공통 함수
  const processDelete = (rowsToRemove) => {
    const api = gridApiRef.current;
    if (!api) return;

    // 서버에 삭제 요청이 필요한 데이터(기존에 있던 데이터)만 필터링
    const targetsForServer = rowsToRemove
      .filter((row) => row.rowStatus === 'R' || row.rowStatus === 'U')
      .map((row) => ({ ...row, rowStatus: 'D' })); // 상태를 'D'로 변경

    setDeletedRows((prev) => [...prev, ...targetsForServer]);

    // 그리드 UI에서 제거
    api.applyTransaction({ remove: rowsToRemove });
  };

  const save = () => {
    const created = [];
    const updated = [];

    // 그리드에 현재 존재하는 노드 순회
    gridApiRef.current.forEachNode((node) => {
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

    // TODO: axios.post('/api/save', saveData) 등 서버 통신 로직
  };

  const addRow = () => {
    const newRow = {
      dataTestId: `temp_${Date.now().toString()}`,
      name: '',
      desc: '',
      active: false,
      userLevel: '',
      mainDisplayYn: 'N',
      rowStatus: 'A',
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
    processDelete(selectedRows);
  };

  const onCellValueChanged = (params) => {
    const { data, node, newValue, oldValue } = params;

    if (newValue === oldValue) {
      return;
    }

    if (data.rowStatus !== 'A') {
      const updatedData = {
        ...data,
        rowStatus: 'U',
      };
      node.setData(updatedData);
    }

    if (!data.rowStatus || data.rowStatus === 'R') {
      const updatedData = {
        ...data,
        rowStatus: 'U',
      };
      node.setData(updatedData);
    }
  };

  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <h3 className="title-text">테이블 batch 패턴 1 : </h3>
          </div>
          <div className="content-body">
            <div className="form-block border-none">
              <form>
                <div className="form-inline justify-start">
                  <AppButton value="추가" style={{ marginRight: 10 }} onClick={addRow} />
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
                    hiddenPagination={true}
                    stopEditingWhenCellsLoseFocus={true}
                    onCellValueChanged={onCellValueChanged}
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
export default GuidePatternTableBatch1;
