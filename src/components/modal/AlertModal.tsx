import { Modal } from 'antd';
import AppButton from '@/components/common/AppButton';
import ReactUtil from '@/utils/ReactUtil';
import { LABEL_MODAL_OK } from '@/config/CommonConstant';

function AlertModal(props) {
  const { isOpen, closeModal, ok, title, body, okLabel = LABEL_MODAL_OK, closable = true } = props;

  const handleOk = () => {
    if (ok) {
      ok();
    } else {
      closeModal();
    }
  };

  const handleCancel = () => {
    if (closeModal) {
      closeModal();
    } else {
      ok();
    }
  };

  return (
    <>
      <Modal
        closable={closable}
        title={title}
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[<AppButton onClick={handleOk} value={okLabel} />]}
      >
        <div dangerouslySetInnerHTML={{ __html: ReactUtil.convertEnterStringToBrTag(body) }}></div>
      </Modal>
    </>
  );
}

export default AlertModal;
