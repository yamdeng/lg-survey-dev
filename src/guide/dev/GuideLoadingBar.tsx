import AppButton from '@/components/common/AppButton';
import Config from '@/config/Config';
import LoadingBar from '@/utils/LoadingBar';

function GuideLoadingBar() {
  const handleClick = () => {
    LoadingBar.show();
    setTimeout(() => {
      LoadingBar.hide();
    }, 3000);
  };

  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <h3 className="title-text">
              로딩바 :{' '}
              <a style={{ fontSize: 20 }} href={Config.hrefBasePath + `dev/GuideLoadingBar.tsx`}>
                GuideLoadingBar
              </a>
            </h3>
          </div>
          <div className="content-body">
            <div className="btn-group-start">
              <AppButton onClick={handleClick} value="로딩바 show" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default GuideLoadingBar;
