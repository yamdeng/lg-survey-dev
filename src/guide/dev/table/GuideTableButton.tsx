import AppTable from '@/components/common/AppTable';
import CodeLabelComponent from '@/components/common/CodeLabelComponent';
import Config from '@/config/Config';

// ActionButtons.tsx (또는 같은 파일 상단)
const ActionButtons = (params) => {
  const onButton1 = () => {
    alert(`name : ${params.data.name}`);
  };

  const onButton2 = () => {
    alert(`dataTestId : ${params.data.dataTestId}`);
  };

  return (
    <div className="btn-group">
      <button className="app-btn primary small" onClick={onButton1}>
        버튼1
      </button>
      <button className="app-btn primary small" onClick={onButton2}>
        버튼2
      </button>
    </div>
  );
};

function GuideTableButton() {
  const columns = [
    {
      field: 'userLevel',
      headerName: '사용자레벨',
      cellRenderer: CodeLabelComponent,
      cellRendererParams: {
        codeGrpId: 'USER_LEVEL',
      },
    },
    {
      field: 'name',
      headerName: '이름',
      flex: 1,
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

  const rowData = [
    { dataTestId: '1', name: 'test1', userLevel: '10', mainDisplayYn: 'Y' },
    { dataTestId: '2', name: 'test1', userLevel: '9', mainDisplayYn: 'Y' },
    { dataTestId: '3', name: 'test1', userLevel: '10', mainDisplayYn: 'N' },
    { dataTestId: '4', name: 'test1', userLevel: '10', mainDisplayYn: 'N' },
    { dataTestId: '5', name: 'test1', userLevel: '10', mainDisplayYn: 'Y' },
    { dataTestId: '6', name: 'test1', userLevel: '10', mainDisplayYn: 'Y' },
  ];

  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <h3 className="title-text">
              테이블에 button :{' '}
              <a
                style={{ fontSize: 20 }}
                href={Config.hrefBasePath + `dev/table/GuideTableCodeLabel.tsx`}
              >
                GuideTableButton
              </a>
            </h3>
          </div>
          <div className="content-body">
            <div className="grid-block">
              <div className="grid-block-body">
                <div className="ag-grid">
                  <AppTable tableHeight={500} pageSize={50} rowData={rowData} columns={columns} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default GuideTableButton;
