import AppButton from '@/components/common/AppButton';
import AppCheckbox from '@/components/common/AppCheckbox';
import AppTable from '@/components/common/AppTable';
import Config from '@/config/Config';
import { getAllData } from '@/data/grid/example-data-new';
import { testColumnInfos } from '@/data/grid/table-column';
import { Modal } from 'antd';
import { useEffect, useRef, useState } from 'react';

function GuideListSearchModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const gridApiRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hiddenPagination] = useState(false);
  const [rowData, setRowData] = useState(getAllData());
  const columns = testColumnInfos;

  const getGridRef = (event) => {
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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <h3 className="title-text">
              ListSearchModal 단순 퍼블리싱 적용 :{' '}
              <a
                style={{ fontSize: 20 }}
                href={Config.hrefBasePath + `dev/modal/GuideListSearchModal.tsx`}
              >
                GuideListSearchModal
              </a>
            </h3>
          </div>
          <div className="content-body">
            <AppButton onClick={openModal} value="formModal" />
          </div>
        </div>
        <Modal
          width={800} // 직접 props로 전달 (숫자는 px 단위)
          centered // 양이 많으므로 화면 중앙에 배치 추천
          closable={true}
          title={'list search modal'}
          open={isModalOpen}
          onOk={closeModal}
          onCancel={closeModal}
        >
          <div>
            <div className="content-body">
              <div className="form-block border-none">
                <form>
                  <div className="form-inline justify-end">
                    <AppButton
                      value="데이터 비우기"
                      onClick={handleButtonClick}
                      style={{ marginRight: 10 }}
                    />
                    <AppCheckbox style={{ marginLeft: 10 }} label="페이징숨기기" />
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
        </Modal>
      </main>
    </>
  );
}
export default GuideListSearchModal;
