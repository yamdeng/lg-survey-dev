import ToastService from '@/services/ToastService';
import Config from '@/config/Config';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import AppButton from '@/components/common/AppButton';

function GuideToastService() {
  const handleToastService = () => {
    ToastService.success('call success');
    ToastService.error('call error');
    ToastService.warn('call warn');
    ToastService.info('call info.');
  };

  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <h3 className="title-text">
              ToastService :{' '}
              <a style={{ fontSize: 20 }} href={Config.hrefBasePath + `dev/GuideToastService.tsx`}>
                GuideToastService
              </a>
            </h3>
          </div>
          <div className="content-body">
            <CopyToClipboard
              text={'설명입니다요.'}
              onCopy={() => ToastService.success('설명 클립보드 복사 완료')}
            >
              <div className="form-table">클립보드 사용법!</div>
            </CopyToClipboard>
            <div className="btn-area">
              <AppButton onClick={handleToastService} value="toast" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default GuideToastService;
