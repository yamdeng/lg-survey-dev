import Logo from '@/publish/components/Logo';
import React from 'react';

import { MenuOutlined } from '@ant-design/icons';
import { Button } from 'antd';

interface ChildProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const SiderTop = ({ collapsed, setCollapsed }: ChildProps) => {
  return (
    <div className="survey-sider-top">
      <Button
        type="text"
        icon={<MenuOutlined />}
        onClick={() => {
          setCollapsed(!collapsed);
        }}
      />
      <Logo />
    </div>
  );
};

export default SiderTop;
