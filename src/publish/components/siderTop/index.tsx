import Logo from '@/publish/components/Logo';
import React from 'react';

import { MenuOutlined } from '@ant-design/icons';
import { Button } from 'antd';

interface ChildProps {
  collapsed?: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  // toggleCollapsed?: () => void;
  toggleCollapsed: () => void;
}

const SiderTop = ({ collapsed, setCollapsed, toggleCollapsed }: ChildProps) => {
  return (
    <div className="survey-sider-top">
      <Button type="text" icon={<MenuOutlined />} onClick={toggleCollapsed} />
      <Logo />
    </div>
  );
};

export default SiderTop;
