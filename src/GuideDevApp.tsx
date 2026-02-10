import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { setNavigator } from '@/utils/navigation';
import GuideHome from './guide/GuideHome';
import { useDevRoute, usePublishRoute } from './routes/useGuideRoute';

function GuideDevApp() {
  const navigate = useNavigate();

  const publishRoute = usePublishRoute();
  const devRoute = useDevRoute();

  useEffect(() => {
    setNavigator(navigate);
  }, [navigate]);

  return (
    <>
      <Routes>
        <Route path="/" element={<GuideHome />} />
        {publishRoute}
        {devRoute}
      </Routes>
      <ToastContainer autoClose={3000} hideProgressBar={true} position="top-center" />
    </>
  );
}

export default GuideDevApp;
