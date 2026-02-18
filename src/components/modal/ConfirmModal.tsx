import { LABEL_MODAL_CANCEL, LABEL_MODAL_OK } from '@/config/CommonConstant';
import ReactUtil from '@/utils/ReactUtil';
import { Modal } from 'antd';

function ConfirmModal(props) {
  const {
    isOpen,
    closeModal,
    ok,
    cancel,
    title,
    body,
    okLabel = LABEL_MODAL_OK,
    cancelLabel = LABEL_MODAL_CANCEL,
    closable = true,
  } = props;

  const handleOk = () => {
    if (ok) {
      ok();
    } else {
      closeModal();
    }
  };

  const handleCancel = () => {
    if (cancel) {
      cancel();
    } else {
      closeModal();
    }
  };

  return (
    <>
      <Modal
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

export default ConfirmModal;
