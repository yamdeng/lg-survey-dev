import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './PublishApp.css';

import MenuList from '@/publish/components/MenuList';
import SiderTop from '@/publish/components/siderTop';

import DashboardMain from '@/publish/pages/dashboardMain';
import Notice from '@/publish/pages/notice';

import LangugeInfo from '@/publish/pages/edition/langugeInfo';
import SurveyInfo from '@/publish/pages/edition/surveyInfo';

import CommonInfo from '@/publish/pages/question/commonInfo';
import QuestionInfo from '@/publish/pages/question/questionInfo';

// icons
import { ConfigProvider, Layout, theme } from 'antd';

const { Footer, Sider } = Layout;

function PublishApp() {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <>
      <ConfigProvider
        theme={{
          algorithm: theme.defaultAlgorithm,
          token: {
            colorPrimary: '#2563EB',
          },
        }}
      >
        <Layout id="survey">
          <Sider
            trigger={null}
            collapsedWidth="60"
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          >
            <SiderTop collapsed={collapsed} setCollapsed={setCollapsed} />
            <MenuList />
          </Sider>
          <Layout className="page-layout">
            <Routes>
              <Route path="/" element={<DashboardMain />} />
              <Route path="/notice" element={<Notice />} />

              <Route path="/edition/surveyInfo" element={<SurveyInfo />} />
              <Route path="/edition/langugeInfo" element={<LangugeInfo />} />

              <Route path="/question/commonInfo" element={<CommonInfo />} />
              <Route path="/question/questionInfo" element={<QuestionInfo />} />
            </Routes>
            <Footer />
          </Layout>
        </Layout>
      </ConfigProvider>
    </>
  );
}

export default PublishApp;
