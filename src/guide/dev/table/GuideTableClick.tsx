import AppTable from '@/components/common/AppTable';
import Config from '@/config/Config';
import { getAllData } from '@/data/grid/example-data-new';
import { testColumnInfos } from '@/data/grid/table-column';
import { useState } from 'react';

function GuideTableClick() {
  const [rowData] = useState(getAllData());
  const columns = testColumnInfos;

  const handleRowDoubleClick = (selectedInfo) => {
    console.log(`handleRowDoubleClick selectedInfo : ${selectedInfo}`);
    // selectedInfo.data 선택한 정보
    alert(`name : ${selectedInfo.data.name}`);
  };

  const handleRowSingleClick = (selectedInfo) => {
    // selectedInfo.data 선택한 정보
    console.log(`handleRowSingleClick selectedInfo : ${selectedInfo}`);
  };

  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <h3 className="title-text">
              테이블 클릭(더블, 싱글) :{' '}
              <a
                style={{ fontSize: 20 }}
                href={Config.hrefBasePath + `dev/table/GuideTableClick.tsx`}
              >
                GuideTableClick
              </a>
            </h3>
          </div>
          <div className="content-body">
            <div className="grid-block">
              <div className="grid-block-body">
                <div className="ag-grid">
                  <AppTable
                    tableHeight={500}
                    pageSize={50}
                    rowData={rowData}
                    columns={columns}
                    handleRowDoubleClick={handleRowDoubleClick}
                    handleRowSingleClick={handleRowSingleClick}
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
export default GuideTableClick;
