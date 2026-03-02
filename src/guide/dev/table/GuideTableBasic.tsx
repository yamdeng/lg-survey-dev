import { useRef, useState, useEffect } from 'react';
import Config from '@/config/Config';
import AppTable from '@/components/common/AppTable';
import { getAllData } from '@/data/grid/example-data-new';
import { testColumnInfos } from '@/data/grid/table-column';
import AppButton from '@/components/common/AppButton';

function GuideTableBasic() {
  const gridApiRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [rowData, setRowData] = useState(getAllData());
  const columns = testColumnInfos;

  const onGridReady = (event) => {
    // 외부에서 api 인스턴스를 직접 사용하고 싶을 경우에 사용
    gridApiRef.current = event.api;
  };

  const handleButtonClick = () => {
    setRowData([]);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <h3 className="title-text">
              테이블 기본 :{' '}
              <a
                style={{ fontSize: 20 }}
                href={Config.hrefBasePath + `dev/table/GuideTableBasic.tsx`}
              >
                GuideTableBasic
              </a>
            </h3>
          </div>
          <div className="content-body">
            <div className="form-block border-none">
              <form>
                <div className="form-inline justify-end">
                  <AppButton value="데이터 비우기" onClick={handleButtonClick} />
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
                    onGridReady={onGridReady}
                    displayTableLoading={isLoading}
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
export default GuideTableBasic;
