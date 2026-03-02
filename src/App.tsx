import AlertModalContainer from '@/components/layout/AlertModalContainer';
import LoadingBarContainer from '@/components/layout/LoadingBarContainer';
import { useStore } from 'zustand';
import { useAppStore } from '@/stores/useAppStore';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import Config from '@/config/Config';
import Logger from '@/utils/Logger';
import CommonUtil from '@/utils/CommonUtil';

function App({ children }) {
  const pathname = window.location.pathname;

  const { isInitComplete, initApp } = useStore(useAppStore, (state) => state);

  useEffect(() => {
    Logger.info(`appVersion : :${Config.appVersion}`);

    // javascript core error handle
    window.onerror = CommonUtil.handleGlobalError;

    // promise error catch
    const handleUnhandledrejection = CommonUtil.handleGlobalUnhandledRejection;

    window.addEventListener('unhandledrejection', handleUnhandledrejection);

    if (!location.pathname.endsWith('/login')) {
      initApp();
    }

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledrejection);
    };
  }, []);

  // 1. 로그인 페이지는 초기화 여부와 상관없이 즉시 노출
  if (pathname === '/login') {
    return (
      <>
        {children}
        <ToastContainer autoClose={3000} hideProgressBar={true} position="top-center" />
        <LoadingBarContainer />
        <AlertModalContainer />
      </>
    );
  }

  // 초기화가 완료될 때까지 로딩 표시
  if (!isInitComplete) {
    return <LoadingBarContainer />;
  }

  return (
    <>
      {children}
      <ToastContainer autoClose={3000} hideProgressBar={true} position="top-center" />
      <LoadingBarContainer />
      <AlertModalContainer />
    </>
  );
}

export default App;
