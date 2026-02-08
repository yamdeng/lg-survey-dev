import '@/resources/css/index.scss';

import { useState } from 'react';

import MenuList from '@/publish/components/MenuList';
import SiderTop from '@/publish/components/siderTop';

import { ConfigProvider, Button } from 'antd';
import { customTheme } from '@/publish/customTheme';
import PageList from '@/publish/PageList';
import { HomeOutlined } from '@ant-design/icons';
import '@/resources/css/index.scss';

function PublishApp() {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <>
      <ConfigProvider theme={customTheme}>
        <div className="survey">
          {/* MenuList 이후 일반 컴포넌트로 변경함 */}
          <aside className="sv-aside">
            <SiderTop collapsed={collapsed} setCollapsed={setCollapsed} />
            <MenuList />
          </aside>

          <div className="sv-content">
            <PageList />

            <footer className="content-footer">
              <div className="content-inner">
                <span className="copyright">© 2026 LG Way Survey. All rights reserved.</span>
              </div>
            </footer>
          </div>
        </div>
      </ConfigProvider>
    </>
  );
}

export default PublishApp;
