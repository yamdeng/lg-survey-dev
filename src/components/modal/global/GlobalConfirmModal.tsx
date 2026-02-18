import { LABEL_MODAL_CANCEL, LABEL_MODAL_OK } from '@/config/CommonConstant';
import { useModalStore } from '@/stores/common/useModalStore';
import ReactUtil from '@/utils/ReactUtil';
import { Modal } from 'antd';

function GlobalConfirmModal(props) {
  const { isOpen, hideModal } = useModalStore();
  const { modalData } = props;
  const {
    title,
    body,
    ok,
    okLabel = LABEL_MODAL_OK,
    cancelLabel = LABEL_MODAL_CANCEL,
    closable = true,
  } = modalData;

  const handleOk = () => {
    if (ok) {
      hideModal();
      ok();
    } else {
      hideModal();
    }
  };

  const handleCancel = () => {
    hideModal();
  };

  return (
    <>
      <Modal
        zIndex={1100}
        closable={closable}
        title={title}
        okText={okLabel}
        cancelText={cancelLabel}
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div dangerouslySetInnerHTML={{ __html: ReactUtil.convertEnterStringToBrTag(body) }}></div>
      </Modal>
    </>
  );
}

export default GlobalConfirmModal;
