import { Modal } from 'antd';
import AppButton from '@/components/common/AppButton';
import ReactUtil from '@/utils/ReactUtil';
import { LABEL_MODAL_OK } from '@/config/CommonConstant';
import { useModalStore } from '@/stores/common/useModalStore';

function GlobalAlertModal(props) {
  const { isOpen, hideModal } = useModalStore();
  const { modalData } = props;
  const { title, body, ok, okLabel = LABEL_MODAL_OK, closable = true } = modalData;

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

export default GlobalAlertModal;
