import AppTable from '@/components/common/AppTable';
import Config from '@/config/Config';
import { getAllData } from '@/data/grid/example-data-new';
import { testColumnInfos } from '@/data/grid/table-column';
import { useState } from 'react';

function GuideTableOnlySingleSelect() {
  const [rowData] = useState(getAllData());
  const columns = testColumnInfos;

  const handleRowSelect = (selectedInfo) => {
    console.log(`handleRowSelect selectedInfo : ${selectedInfo}`);
  };

  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <h3 className="title-text">
              테이블 선택(only 싱글), row style :{' '}
              <a
                style={{ fontSize: 20 }}
                href={Config.hrefBasePath + `dev/table/GuideTableOnlySingleSelect.tsx`}
              >
                GuideTableOnlySingleSelect
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
                    handleRowSelect={handleRowSelect}
                    rowSelectMode={'singleRow'}
                    getRowStyle={(params) => {
                      const { data, rowIndex } = params;
                      if (rowIndex === 0) {
                        return { background: '#d6d9eb' };
                      } else if (data.position === '차장') {
                        return { background: '#d6d9eb' };
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
export default GuideTableOnlySingleSelect;
