import AppButton from '@/components/common/AppButton';
import { useUIStore } from '@/stores/useUIStore';
import { useStore } from 'zustand';

const NotFound = () => {
  const reloadApp = useStore(useUIStore, (state) => state.reloadApp);

  const handleGoHome = () => {
    // location.href 대신 navigate를 사용하여 SPA 상태 유지 가능 (필요시 location.href 사용)
    window.location.href = '/';
  };

  const handleRefresh = () => {
    reloadApp();
  };

  return (
    <div className="error-box">
      <h2>페이지를 찾을 수 없습니다.</h2>

      <div className="button-group">
        <AppButton onClick={handleGoHome} value="Home" />
        <AppButton onClick={handleRefresh} value="다시 시도" />
      </div>
    </div>
  );
};

export default NotFound;
