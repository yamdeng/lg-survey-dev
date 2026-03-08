import AppButton from '@/components/common/AppButton';
import AppTable from '@/components/common/AppTable';
import CodeLabelComponent from '@/components/common/CodeLabelComponent';
import CodeService from '@/services/CodeService';
import Config from '@/config/Config';
import { useRef, useState } from 'react';

/*

  기본 에디팅 input 사용방법
   1.eidtable 속성으로 컬럼이 editable이여도 readyOnly 처리되게끔 반영
    -editable은 기본적으로 pagination을 사용하면 않됩니다~
   2.기본 에디터 타입들 체크
    -code data 포함
   3.수정된 값 이용하는 방법

*/

function GuideTableBatchBasic() {
  const gridApiRef = useRef<any>(null);

  const [editable, setEditable] = useState(true);

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
      field: 'age',
      headerName: '나이',
      width: 100,
      editable: true,
      cellEditor: 'agNumberCellEditor',
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
      headerName: '상태',
      field: 'status',
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['대기', '진행중', '완료'],
      },
    },
    {
      headerName: '도시 선택',
      field: 'cityCode', // 실제 데이터는 'SEO', 'PUS' 등
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        // 1. 에디터 리스트에는 실제 "값(Value)"들을 넣습니다.
        values: ['SEO', 'PUS', 'ICN'],
      },
      // 2. [Label 처리] 그리드 화면에 'SEO' 대신 '서울'이라고 보여줌
      valueFormatter: (params: any) => {
        const cityMap: any = { SEO: '서울', PUS: '부산', ICN: '인천' };
        return cityMap[params.value] || params.value;
      },
      // 3. [Value 처리] 선택된 라벨을 다시 코드값으로 변환 (Select는 기본적으로 값을 반환하므로 생략 가능하나 명시적 처리 시 사용)
      valueParser: (params: any) => {
        return params.newValue;
      },
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
  ];

  const rowData = [
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
    },
  ];

  const getGridRef = (event) => {
    // 외부에서 api 인스턴스를 직접 사용하고 싶을 경우에 사용
    gridApiRef.current = event.api;
  };

  const save = () => {
    const allData = [];

    gridApiRef.current.forEachNode((node) => {
      allData.push(node.data);
    });

    console.log(allData);
  };

  const toggleEditable = () => {
    setEditable((prev) => {
      return !prev;
    });
  };

  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <h3 className="title-text">
              table batch 기본1 :{' '}
              <a
                style={{ fontSize: 20 }}
                href={Config.hrefBasePath + `dev/table/GuideTableBatchBasic.tsx`}
              >
                GuideTableBatchBasic
              </a>
            </h3>
          </div>
          <div className="content-body">
            <div className="form-block border-none">
              <form>
                <div className="form-inline justify-start">
                  <AppButton value="저장" onClick={save} style={{ marginRight: 10 }} />
                  <AppButton value="editable 토글" onClick={toggleEditable} />
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
                    editable={editable}
                    hiddenPagination
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
export default GuideTableBatchBasic;
