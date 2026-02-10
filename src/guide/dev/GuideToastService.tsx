import ToastService from '@/services/ToastService';
import Config from '@/config/Config';
import { CopyToClipboard } from 'react-copy-to-clipboard';

function GuideToastService() {
  const handleToastService = () => {
    ToastService.success('call success');
    ToastService.error('call error');
    ToastService.warn('call warn');
    ToastService.info('call info.');
  };

  return (
    <>
      <div className="conts-title">
        <h2>
          ToastService :{' '}
          <a style={{ fontSize: 20 }} href={Config.hrefBasePath + `GuideToastService.tsx`}>
            GuideToastService
          </a>
        </h2>
      </div>
      <div className="editbox">
        <CopyToClipboard
          text={'설명입니다요.'}
          onCopy={() => ToastService.success('설명 클립보드 복사 완료')}
        >
          <div className="form-table">설명입니다요.</div>
        </CopyToClipboard>
        <div className="btn-area">
          <button
            type="button"
            name="button"
            className="btn-sm btn_text btn-darkblue-line"
            onClick={handleToastService}
          >
            toast
          </button>
        </div>
      </div>
    </>
  );
}
export default GuideToastService;
