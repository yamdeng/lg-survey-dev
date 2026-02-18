import AppButton from '@/components/common/AppButton';
import AlertModal from '@/components/modal/AlertModal';
import ConfirmModal from '@/components/modal/ConfirmModal';
import Config from '@/config/Config';
import { useState } from 'react';

function GuideAlertConfirmModal() {
  const [isOpenAlertModal, setIsOpenAlertModal] = useState(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const openAlertModal = () => {
    setIsOpenAlertModal(true);
  };
  const openConfirmModal = () => {
    setIsOpenConfirmModal(true);
  };

  const okAlert = () => {
    setIsOpenAlertModal(false);
  };

  const okConfirm = () => {
    setIsOpenConfirmModal(false);
  };
  const cancelConfirm = () => {
    setIsOpenConfirmModal(false);
  };

  const customButtonStyle = { marginBottom: 10 };

  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <h3 className="title-text">
              AlertModa, ConfirmModal 사용법 :{' '}
              <a
                style={{ fontSize: 20 }}
                href={Config.hrefBasePath + `dev/GuideAlertConfirmModal.tsx`}
              >
                GuideAlertConfirmModal
              </a>
            </h3>
          </div>
          <div className="content-body">
            <AppButton onClick={openAlertModal} style={customButtonStyle} value="alertModal" />
            <AppButton onClick={openConfirmModal} style={customButtonStyle} value="confirmModal" />
          </div>
          <AlertModal
            isOpen={isOpenAlertModal}
            title="Alert모달입니다."
            body={'모달 Body 입니다.'}
            okLabel="확인2"
            ok={okAlert}
            closeModal={okAlert}
          />
          <ConfirmModal
            isOpen={isOpenConfirmModal}
            title="Confirm모달입니다."
            body={'모달 Body 입니다.'}
            okLabel="확인2"
            cancelLabel="취소2"
            ok={okConfirm}
            cancel={cancelConfirm}
          />
        </div>
      </main>
    </>
  );
}
export default GuideAlertConfirmModal;
