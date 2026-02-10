import { useState } from 'react';

import MenuList from '@/publish/components/MenuList';
import SiderTop from '@/publish/components/siderTop';

import PageList from '@/publish/PageList';

function PublishApp() {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <div className="survey">
        <aside className={collapsed ? 'collapsed' : ''}>
          <SiderTop
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            toggleCollapsed={toggleCollapsed}
          />
          <MenuList collapsed={collapsed} />
        </aside>

        <div className="sv-content">
          <PageList />
        </div>
      </div>
    </>
  );
}

export default PublishApp;
