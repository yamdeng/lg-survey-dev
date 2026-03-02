import AppButton from '@/components/common/AppButton';
import Config from '@/config/Config';

function GuideButton() {
  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <h3 className="title-text">
              button 예제 :{' '}
              <a style={{ fontSize: 20 }} href={Config.hrefBasePath + `dev/GuideButton.tsx`}>
                GuideButton
              </a>
            </h3>
          </div>
          <div className="content-body">
            <AppButton theme="primary" value="theme primary" />
            <br />
            <AppButton theme="secondary" value="theme secondary" />
            <div className="btn-group">
              <AppButton theme="primary" value="theme primary" />
              <AppButton theme="secondary" value="theme secondary" />
              <AppButton theme="basic" value="theme basic" />
            </div>

            <div className="btn-group">
              <AppButton size="small" value="small" />
              <AppButton size="middle" value="size middle" />
              <AppButton size="large" value="size large" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default GuideButton;
