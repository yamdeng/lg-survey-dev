import { useModalStore } from '@/stores/common/useModalStore';
import ModalType from '@/config/ModalType';
import GlobalAlertModal from '@/components/modal/global/GlobalAlertModal';
import GlobalConfirmModal from '@/components/modal/global/GlobalConfirmModal';

function AlertModalContainer() {
  let modalComponent = null;
  const { modalType, isOpen, modalData } = useModalStore();

  switch (modalType) {
    case ModalType.ALERT_MODAL:
      modalComponent = <GlobalAlertModal modalData={modalData} isOpen={isOpen} />;
      break;
    case ModalType.CONFRIM_MODAL:
      modalComponent = <GlobalConfirmModal modalData={modalData} isOpen={isOpen} />;
      break;
    default:
      break;
  }
  return <div>{modalComponent}</div>;
}

export default AlertModalContainer;
