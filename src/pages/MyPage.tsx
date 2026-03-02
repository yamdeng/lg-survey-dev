import { useEffect } from 'react';
import { useStore } from 'zustand';
import { useAppStore } from '@/stores/useAppStore';

const MyPage = () => {
  const { getProfile, profile } = useStore(useAppStore, (state) => state);

  useEffect(() => {
    getProfile();
  }, []);

  return <div>MyPage</div>;
};

export default MyPage;
