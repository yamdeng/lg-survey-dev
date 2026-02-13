import { useState } from 'react';
import LoadingBarContainer from '@/components/layout/LoadingBarContainer';

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
          <PageList />
        </div>
      </div>
      <LoadingBarContainer />
    </>
  );
}

export default PublishApp;
