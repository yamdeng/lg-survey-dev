import AppTable from '@/components/common/AppTable';
import Config from '@/config/Config';
import { getAllData, getPageData } from '@/data/grid/example-data-new';
import { testColumnInfos } from '@/data/grid/table-column';
import { useState } from 'react';
import AppRadioGroup from '@/components/common/AppRadioGroup';
import AppButton from '@/components/common/AppButton';

function GuideTableSelect2() {
  const [rowData, setRawData] = useState(getAllData());
  const [selectedIds, setSelectedIds] = useState([]); // ID만 따로 관리
  const [rowSelectMode, setRowSelectMode] = useState('multiRow'); // singleRow, multiRow
  const columns = testColumnInfos;

  const handleRowSelect = (selectedData) => {
    // 멀티 선택 모드일 경우 배열로 들어옴
    const ids = Array.isArray(selectedData)
      ? selectedData.map((item) => item.id)
      : [selectedData?.id];

    setSelectedIds(ids);
  };

  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <h3 className="title-text">
              테이블 선택(더블, 싱글) 키 동기화 :{' '}
              <a
                style={{ fontSize: 20 }}
                href={Config.hrefBasePath + `dev/table/GuideTableSelect2.tsx`}
              >
                GuideTableSelect2
              </a>
            </h3>
          </div>
          <div className="content-body">
            <div className="form-block border-none">
              <form>
                <div className="form-inline justify-start">
                  <AppRadioGroup
                    options={[
                      { value: 'singleRow', label: '싱글' },
                      { value: 'multiRow', label: '멀티' },
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
                    selectedRowIds={selectedIds}
                    rowIdKey="id"
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
export default GuideTableSelect2;
