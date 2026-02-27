import CommonUtil from '@/utils/CommonUtil';
import Config from '@/config/Config';
import AppButton from '@/components/common/AppButton';

function GuideCookie() {
  const setCookie = () => {
    CommonUtil.setCookie('yamdeng', 'aaa');
    CommonUtil.setCookie('refershToken', 'testaaa');
  };

  const getCookie = () => {
    alert(CommonUtil.getCookie('yamdeng'));
    alert(CommonUtil.getCookie('refershToken'));
  };

  const customButtonStyle = { marginBottom: 10 };

  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <h3 className="title-text">
              Cookie Test
              <a style={{ fontSize: 20 }} href={Config.hrefBasePath + `dev/GuideCookie.tsx`}>
                GuideCookie
              </a>
            </h3>
          </div>
          <div className="content-body">
            <AppButton onClick={setCookie} style={customButtonStyle} value="setCookie" />
            <AppButton onClick={getCookie} style={customButtonStyle} value="getCookie" />
          </div>
        </div>
      </main>
    </>
  );
}
export default GuideCookie;
