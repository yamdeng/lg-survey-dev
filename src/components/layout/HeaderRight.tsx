import { LogOut, UserRound } from 'lucide-react';
import { useStore } from 'zustand';
import { useAppStore } from '@/stores/useAppStore';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const HeaderRight = () => {
  const logout = useStore(useAppStore, (state) => state.logout);
  const navigate = useNavigate();

  return (
    <div className="header-menu">
      <Button
        type="link"
        size="small"
        onClick={() => {
          navigate('/mypage');
        }}
      >
        <UserRound size={14} />
        <span>My Page</span>
      </Button>
      <Button
        type="link"
        size="small"
        onClick={() => {
          logout();
        }}
      >
        <LogOut size={14} />
        <span>Log Out</span>
      </Button>
    </div>
  );
};

export default HeaderRight;
