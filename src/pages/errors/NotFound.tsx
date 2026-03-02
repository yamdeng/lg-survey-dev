import AppButton from '@/components/common/AppButton';

const NotFound = () => {
  const handleGoHome = () => {
    // location.href 대신 navigate를 사용하여 SPA 상태 유지 가능 (필요시 location.href 사용)
    window.location.href = '/';
  };

  return (
    <>
      <main className="content-main">
        <div className="content-inner">
          <div className="content-body">
            <div className="error-box">
              <h2>페이지를 찾을 수 없습니다.</h2>
            </div>
            <div className="btn-group">
              <AppButton onClick={handleGoHome} value="Home" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default NotFound;
