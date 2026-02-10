import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { setNavigator } from '@/utils/navigation';

function GuideDevApp() {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigator(navigate);
  }, [navigate]);

  return (
    <>
      <div>aaa</div>
      <ToastContainer autoClose={3000} hideProgressBar={true} position="top-center" />
    </>
  );
}

export default GuideDevApp;
