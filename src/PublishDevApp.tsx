import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { setNavigator } from '@/utils/navigation';

function PublishDevApp() {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigator(navigate);
  }, [navigate]);

  return (
    <>
      <ToastContainer autoClose={3000} hideProgressBar={true} position="top-center" />
    </>
  );
}

export default PublishDevApp;
