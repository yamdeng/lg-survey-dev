import AppTable from '@/components/common/AppTable';
import CodeLabelComponent from '@/components/common/CodeLabelComponent';
import Config from '@/config/Config';

function GuideTableCodeLabel() {
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
    { name: 'test1', userLevel: '10', mainDisplayYn: 'Y' },
    { name: 'test1', userLevel: '9', mainDisplayYn: 'Y' },
    { name: 'test1', userLevel: '10', mainDisplayYn: 'N' },
    { name: 'test1', userLevel: '10', mainDisplayYn: 'N' },
    { name: 'test1', userLevel: '10', mainDisplayYn: 'Y' },
    { name: 'test1', userLevel: '10', mainDisplayYn: 'Y' },
  ];

  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <h3 className="title-text">
              테이블 컬럼에 code 사용 :{' '}
              <a
                style={{ fontSize: 20 }}
                href={Config.hrefBasePath + `dev/table/GuideTableCodeLabel.tsx`}
              >
                GuideTableCodeLabel
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
export default GuideTableCodeLabel;
