import AppTable from '@/components/common/AppTable';
import Config from '@/config/Config';
import { getAllData } from '@/data/grid/example-data-new';
import { testColumnInfos } from '@/data/grid/table-column';
import { useState } from 'react';
import AppRadioGroup from '@/components/common/AppRadioGroup';
import AppCheckbox from '@/components/common/AppCheckbox';

function GuideTableSeletable() {
  const [rowData] = useState(getAllData());
  const [rowSelectMode, setRowSelectMode] = useState('multiRow'); // singleRow, multiRow
  const [hideDisabledCheckboxes, setHideDisabledCheckboxes] = useState(true);
  const columns = testColumnInfos;

  const defaultColDef = { sortable: false, minWidth: 200 };

  const handleRowSelect = (selectedInfo) => {
    console.log(`handleRowSelect selectedInfo : ${selectedInfo}`);
  };

  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <h3 className="title-text">
              테이블 선택 막기 :{' '}
              <a
                style={{ fontSize: 20 }}
                href={Config.hrefBasePath + `dev/table/GuideTableSeletable.tsx`}
              >
                GuideTableSeletable
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
                  <AppCheckbox
                    style={{ marginLeft: 10 }}
                    label="체크박스숨기기"
                    value={hideDisabledCheckboxes}
                    onChange={(value) => setHideDisabledCheckboxes(value)}
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
                    isRowSelectable={(rowNode) =>
                      rowNode.data.position === '대리' || rowNode.data.position === '과장'
                        ? true
                        : false
                    }
                    hideDisabledCheckboxes={hideDisabledCheckboxes}
                    defaultColDef={defaultColDef}
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
export default GuideTableSeletable;
