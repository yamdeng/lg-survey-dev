import { Link } from 'react-router-dom';
import { UserRound, LogOut } from 'lucide-react';
import { Button } from 'antd';

const HeaderMenu = () => {
  return (
    <div className="header-menu">
      <Button type="link" size="small">
        <UserRound size={14} />
        <Link to="#">My Page</Link>
      </Button>
      <Button type="link" size="small">
        <LogOut size={14} />
        <Link to="#">Log Out</Link>
      </Button>
    </div>
  );
};

export default HeaderMenu;
