import { useState } from 'react';

import MenuList from '@/publish/components/MenuList';
import SiderTop from '@/publish/components/siderTop';

import { ConfigProvider, Button } from 'antd';
import { customTheme } from '@/publish/customTheme';
import PageList from '@/publish/PageList';

import '@/resources/css/index.scss';

function PublishApp() {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <ConfigProvider theme={customTheme}>
        <div className="survey">
          <aside className={collapsed ? 'sv-aside collapsed' : 'sv-aside'}>
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
      </ConfigProvider>
    </>
  );
}

export default PublishApp;
