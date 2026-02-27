import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import MenuList from '@/publish/components/MenuList';
import SiderTop from '@/publish/components/siderTop';

export default function GuideLayout() {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <div className="survey">
        <aside className={collapsed ? 'collapsed' : ''}>
          <div className="side-fixed">
            <SiderTop
              collapsed={collapsed}
              setCollapsed={setCollapsed}
              toggleCollapsed={toggleCollapsed}
            />
            <MenuList collapsed={collapsed} />
          </div>
        </aside>
        <div className="sv-content">
          <Outlet />
        </div>
      </div>
    </>
  );
}
