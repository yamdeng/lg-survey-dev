import { useRef, useState, useEffect } from 'react';
import Config from '@/config/Config';
import AppTable from '@/components/common/AppTable';
import { getAllData } from '@/data/grid/example-data-new';
import { testColumnInfos } from '@/data/grid/table-column';
import AppButton from '@/components/common/AppButton';

function GuideTableBasic() {
  const gridApiRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hiddenPagination, setHiddenPagination] = useState(false);
  const [rowData, setRowData] = useState(getAllData());
  const columns = testColumnInfos;

  const getGridRef = (event) => {
    // 외부에서 api 인스턴스를 직접 사용하고 싶을 경우에 사용
    gridApiRef.current = event.api;
  };

  const handleButtonClick = () => {
    setRowData([]);
  };

  const togglePagination = () => {
    setHiddenPagination((prev) => {
      return !prev;
    });
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
                  <AppButton
                    value="데이터 비우기"
                    onClick={handleButtonClick}
                    style={{ marginRight: 10 }}
                  />
                  <AppButton value="페이징토글" onClick={togglePagination} />
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
                    getGridRef={getGridRef}
                    displayTableLoading={isLoading}
                    hiddenPagination={hiddenPagination}
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
