import AppTable from '@/components/common/AppTable';
import Config from '@/config/Config';
import { getAllData, getPageData } from '@/data/grid/example-data-new';
import { testColumnInfos } from '@/data/grid/table-column';
import { useState } from 'react';
import AppRadioGroup from '@/components/common/AppRadioGroup';
import AppButton from '@/components/common/AppButton';

function GuideTableSelect() {
  const [rowData, setRawData] = useState(getAllData());
  const [rowSelectMode, setRowSelectMode] = useState('multiRow'); // singleRow, multiRow
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
              테이블 선택(더블, 싱글) :{' '}
              <a
                style={{ fontSize: 20 }}
                href={Config.hrefBasePath + `dev/table/GuideTableSelect.tsx`}
              >
                GuideTableSelect
              </a>
            </h3>
          </div>
          <div className="content-body">
            <div className="form-block border-none">
              <form>
                <div className="form-inline justify-start">
                  <AppRadioGroup
                    options={[
                      { value: 'multiRow', label: '싱글' },
                      { value: 'singleRow', label: '멀티' },
                    ]}
                    value={rowSelectMode}
                    onChange={(value) => setRowSelectMode(value)}
                  />
                  <AppButton
                    value="데이터리셋"
                    onClick={() => {
                      setRawData(getPageData(1, 20));
                    }}
                    style={{ marginLeft: 10 }}
                  />
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
                    columns={columns}
                    handleRowSelect={handleRowSelect}
                    enableCheckBox
                    rowSelectMode={rowSelectMode}
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
export default GuideTableSelect;
