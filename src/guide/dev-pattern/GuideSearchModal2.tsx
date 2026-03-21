import AppButton from '@/components/common/AppButton';
import AppCheckbox from '@/components/common/AppCheckbox';
import AppSearchInput from '@/components/common/AppSearchInput';
import AppTable from '@/components/common/AppTable';
import { noticeBaseColumns } from '@/data/grid/table-column';
import { createListSlice, listBaseState } from '@/stores/slice/listSlice';
import { Modal } from 'antd';
import { FilePenLine } from 'lucide-react';
import { useEffect, useState } from 'react';
import { create } from 'zustand';

/*

  #.목록 모달 오픈 case : store 기반 예시
   -모달에서 오픈 되서 전달받은 값을 이용하는 case

*/

const initListData = {
  ...listBaseState,
  listApiPath: 'notices',
};

const useListStore = create<any>((set, get) => ({
  ...createListSlice(set, get),

  ...initListData,

  clear: () => {
    set({ ...listBaseState });
  },
}));

const ListTestModal = (props) => {
  const { isOpen, isMultiple, closeModal, okModal } = props;
  const columns = noticeBaseColumns;

  const {
    search,
    list,
    selectedRowInfos,
    selectedRowKeys,
    changeSelectedRowInfos,
    changeSelectedRowKeys,
  } = useListStore();

  const handleRowSelect = (selectedData) => {
    // 멀티 선택 모드일 경우 배열로 들어옴
    changeSelectedRowInfos(selectedData);

    // 중요! : boardKey로 정의(각 행의 id 키값 반영)
    const ids = Array.isArray(selectedData)
      ? selectedData.map((item) => item.boardKey)
      : [selectedData?.boardKey];

    changeSelectedRowKeys(ids);
  };

  const handleApply = () => {
    okModal(selectedRowInfos);
  };

  useEffect(() => {
    if (isOpen) {
      search();
    }
  }, [isOpen]);

  const okButtonEnable = isMultiple
    ? selectedRowInfos && selectedRowInfos.length
    : selectedRowInfos;

  return (
    <Modal
      width={800} // 직접 props로 전달 (숫자는 px 단위)
      centered // 양이 많으므로 화면 중앙에 배치 추천
      closable={true}
      title={'list search modal'}
      open={isOpen}
      onOk={closeModal}
      onCancel={closeModal}
      footer={null}
    >
      <div>
        <div className="content-body">
          <div className="form-block border-none">
            <form>
              <div className="form-inline justify-end">
                <AppSearchInput value="입력해주세요" style={{ marginRight: 10 }} />
              </div>
            </form>
          </div>
          <div className="grid-block">
            <div className="grid-block-body">
              <div className="ag-grid">
                <AppTable
                  tableHeight={500}
                  pageSize={20}
                  rowData={list}
                  columns={columns}
                  rowSelectMode={isMultiple ? 'multiRow' : 'singleRow'}
                  handleRowSelect={handleRowSelect}
                  enableCheckBox
                  selectedRowIds={selectedRowKeys}
                  rowIdKey="boardKey"
                />
              </div>
            </div>
          </div>
          <div className="btn-group-end">
            <AppButton value="취소" onClick={closeModal} />
            <AppButton value="적용" onClick={handleApply} disabled={!okButtonEnable} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

const GuideSearchModal2 = () => {
  const [isMultiple, setIsMultiple] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* 모달 함수 */
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const okModal = (listSelectedInfo) => {
    setIsModalOpen(false);
    console.log(listSelectedInfo);
  };

  return (
    <main className="content-main">
      <div className="content-inner">
        <div className="content-title">
          <FilePenLine size={18} />
          <h3 className="title-text">GuideSearchModal1</h3>
        </div>
        <div className="content-body">
          <div className="form-block border-none">
            <form>
              <div className="form-inline justify-start">
                <AppCheckbox
                  label="멀티선택"
                  value={isMultiple}
                  onChange={(value) => setIsMultiple(value)}
                />
                <AppButton
                  value="모달오픈"
                  onClick={() => {
                    setIsModalOpen(true);
                  }}
                  style={{ marginLeft: 10 }}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <ListTestModal
        isOpen={isModalOpen}
        isMultiple={isMultiple}
        closeModal={closeModal}
        okModal={okModal}
      />
    </main>
  );
};

export default GuideSearchModal2;
