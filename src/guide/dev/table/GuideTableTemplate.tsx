import AppButton from '@/components/common/AppButton';
import AppTable from '@/components/common/AppTable';
import Config from '@/config/Config';
import { getAllData } from '@/data/grid/example-data-new';
import { testColumnInfos } from '@/data/grid/table-column';
import { useState } from 'react';

function GuideTableTemplate() {
  const [rowData, setRowData] = useState(getAllData());
  const columns = testColumnInfos;

  const handleButtonClick = () => {};

  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <h3 className="title-text">
              GuideTableTemplate :{' '}
              <a
                style={{ fontSize: 20 }}
                href={Config.hrefBasePath + `dev/table/GuideTableClick.tsx`}
              >
                GuideTableTemplate
              </a>
            </h3>
          </div>
          <div className="content-body">
            <div className="form-block border-none">
              <form>
                <div className="form-inline justify-end">
                  <AppButton value="클릭" onClick={handleButtonClick} style={{ marginRight: 10 }} />
                </div>
              </form>
            </div>
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
export default GuideTableTemplate;
