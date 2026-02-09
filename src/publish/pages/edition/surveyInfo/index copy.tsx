import { AgGridReact } from 'ag-grid-react';
import { useState } from 'react';

const rowData: any[] = [];

for (let index = 0; index < 10; index++) {
  rowData.push({
    name: '안용성' + (index + 1),
    name2: 'test2',
    name3: 'test3',
    name4: 'test4',
    name5: 'test5',
    name6: 'test6',
    reportTitle: '보고서1',
    reportTitle2: '보고서2',
  });
}

function SurveyInfo() {
  const [columns] = useState<any>([
    { field: 'name', headerName: '이름' },
    { field: 'name2', headerName: '이름2' },
    { field: 'name3', headerName: '이름3' },
    { field: 'name4', headerName: '이름4' },
    { field: 'name5', headerName: '이름5' },
    { field: 'name6', headerName: '이름6' },
    { field: 'reportTitle', headerName: '보고서명' },
    { field: 'reportTitle2', headerName: '보고서명2' },
  ]);
  return (
    <div>
      <div className={'ag-theme-quartz'} style={{ height: 580 }}>
        <AgGridReact
          rowModelType="clientSide"
          suppressMultiSort={true}
          domLayout={'normal'}
          rowData={rowData}
          columnDefs={columns}
          pagination={false}
          tooltipShowDelay={100}
          tooltipHideDelay={1000}
          tooltipMouseTrack={true}
          enableBrowserTooltips={false}
        />
      </div>

      <div className="pagination">
        <a className="first" href="">
          <span className="sr-only">이전</span>
        </a>
        <a className="prev" href="">
          <span className="sr-only">이전</span>
        </a>
        <span>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((pageIndex) => {
            const pageComponent = (
              <a href="" key={pageIndex}>
                {pageIndex}
              </a>
            );
            return pageComponent;
          })}
        </span>
        <a className="next" href="">
          <span className="sr-only">다음</span>
        </a>
        <a className="last" href="">
          <span className="sr-only">다음</span>
        </a>
      </div>
    </div>
  );
}

export default SurveyInfo;
