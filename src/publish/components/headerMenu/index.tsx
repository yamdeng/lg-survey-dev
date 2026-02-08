import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { UserRound, LogOut } from 'lucide-react';
import { Button } from 'antd';

const HeaderMenu = () => {
  return (
    <div className="header-menu">
      <Button type="link">
        <UserRound size={16} />
        My Page
      </Button>
      <Button type="link">
        <LogOut size={16} />
        Log Out
      </Button>
    </div>
  );
};

export default HeaderMenu;
