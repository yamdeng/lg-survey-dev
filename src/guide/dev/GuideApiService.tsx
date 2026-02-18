import ApiService from '@/services/ApiService';
import Config from '@/config/Config';
import AppButton from '@/components/common/AppButton';

function GuideApiService() {
  const handleApiServiceBasic = async () => {
    const apiResult = await ApiService.get('simpleMap1');
    // 서버의 응답값만 가져옴
    console.log(`apiResult : ${JSON.stringify(apiResult)}`);
  };

  const disableLoadingBar = async () => {
    ApiService.get('simpleMap1', null, {
      disableLoadingBar: true,
    });
  };

  const applyOriginalResponse = async () => {
    const apiResult = await ApiService.get(`simpleMap1`, null, {
      applyOriginalResponse: true,
    });
    // 서버의 응답값외의 http 전반적인 모든 값을 가져온다
    console.log(`apiResult : ${JSON.stringify(apiResult)}`);
  };

  const byPassError = async () => {
    const errorInfo = await ApiService.get('error/etc', null, {
      byPassError: true,
    });
    console.log(`errorInfo : ${errorInfo}`);
  };

  const customButtonStyle = { marginBottom: 10 };

  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-title">
            <h3 className="title-text">
              ApiService :{' '}
              <a style={{ fontSize: 20 }} href={Config.hrefBasePath + `dev/GuideApiService.tsx`}>
                GuideApiService
              </a>
            </h3>
          </div>
          <div className="content-body">
            <AppButton
              onClick={handleApiServiceBasic}
              style={customButtonStyle}
              value="기본 연동"
            />
            <AppButton
              onClick={disableLoadingBar}
              style={customButtonStyle}
              value="disableLoadingBar"
            />
            <AppButton
              onClick={applyOriginalResponse}
              style={customButtonStyle}
              value="applyOriginalResponse"
            />
            <AppButton onClick={byPassError} style={customButtonStyle} value="byPassError" />
          </div>
        </div>
      </main>
    </>
  );
}
export default GuideApiService;
