import ModalService from '@/services/ModalService';
import Config from '@/config/Config';
import AppButton from '@/components/common/AppButton';

function GuideModalService() {
  const handleAlertModal = () => {
    ModalService.alert({
      title: 'alert test',
      body: '안녕하세요.\n반갑습니다.',
      okLabel: '닫아주세요.',
      ok: () => {
        alert('ok handler');
      },
    });
  };

  const handleConfirmModal = () => {
    ModalService.confirm({
      title: 'confirm test',
      body: '안녕하세요.\n반갑습니다.',
      okLabel: '저장2.',
      cancelLabel: '취소2',
      ok: () => {
        alert('ok handler');
      },
      cancel: () => {
        alert('cancel handler');
      },
    });
  };

  const customButtonStyle = { marginBottom: 10 };

  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <h3 className="title-text">
              ModalService.alert, ModalService.confirm :{' '}
              <a style={{ fontSize: 20 }} href={Config.hrefBasePath + `dev/GuideModalService.tsx`}>
                GuideModalService
              </a>
            </h3>
          </div>
          <div className="content-body">
            <AppButton onClick={handleAlertModal} style={customButtonStyle} value="alert modal" />
            <AppButton
              onClick={handleConfirmModal}
              style={customButtonStyle}
              value="confirm modal"
            />
          </div>
        </div>
      </main>
    </>
  );
}
export default GuideModalService;
