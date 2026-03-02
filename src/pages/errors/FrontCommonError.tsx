import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { useEffect } from 'react';
import { ERROR_TYPE_REACT } from '@/config/CommonConstant';
import { useStore } from 'zustand';
import { useUIStore } from '@/stores/useUIStore';
import Logger from '@/utils/Logger';
import AppButton from '@/components/common/AppButton';

const FrontCommonError = () => {
  const error = useRouteError() as any;
  const reloadApp = useStore(useUIStore, (state) => state.reloadApp);

  // 기존 componentDidCatch의 로깅 로직을 useEffect로 구현
  useEffect(() => {
    const errorObject: any = {
      errorType: ERROR_TYPE_REACT,
      message: error?.message || (isRouteErrorResponse(error) ? 'Route Error' : 'Unknown Error'),
      stack: error?.stack,
      componentStack: error?.componentStack, // React Router가 제공하는 정보
    };

    Logger.info(errorObject);
  }, [error]);

  const handleGoHome = () => {
    // location.href 대신 navigate를 사용하여 SPA 상태 유지 가능 (필요시 location.href 사용)
    window.location.href = '/';
  };

  const handleRefresh = () => {
    reloadApp();
  };

  return (
    <div className="error-box">
      <h2>오류가 발생하였습니다.</h2>
      {/* 404와 일반 런타임 에러 메시지 분기 처리 (선택사항) */}
      <p>
        {isRouteErrorResponse(error) && error.status === 404
          ? '페이지를 찾을 수 없습니다.'
          : '서비스 이용에 불편을 드려 죄송합니다.'}
      </p>

      <div className="btn-group">
        <AppButton onClick={handleGoHome} value="Home" />
        <AppButton onClick={handleRefresh} value="다시 시도" />
      </div>
    </div>
  );
};

export default FrontCommonError;
