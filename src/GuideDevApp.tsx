import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { setNavigator } from '@/utils/navigation';
import GuideHome from './guide/GuideHome';
import { usePublishRoute, useDevRoute, useDevPatternRoute } from './routes/useGuideRoute';
import LoadingBarContainer from '@/components/layout/LoadingBarContainer';
import AlertModalContainer from './components/layout/AlertModalContainer';

function GuideDevApp() {
  const navigate = useNavigate();

  const publishRoute = usePublishRoute();
  const devRoute = useDevRoute();
  const devPatternRoute = useDevPatternRoute();

  useEffect(() => {
    setNavigator(navigate);
  }, [navigate]);

  return (
    <>
      <Routes>
        <Route path="/" element={<GuideHome />} />
        {publishRoute}
        {devRoute}
        {devPatternRoute}
      </Routes>
      <ToastContainer autoClose={3000} hideProgressBar={true} position="top-center" />
      <LoadingBarContainer />
      <AlertModalContainer />
    </>
  );
}

export default GuideDevApp;
