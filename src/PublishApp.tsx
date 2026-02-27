import { useState } from 'react';
import LoadingBarContainer from '@/components/layout/LoadingBarContainer';

import { Router } from '@/publish/Router';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { customTheme } from '@/publish/customTheme';

function PublishApp() {
  return (
    <>
      <ConfigProvider theme={customTheme}>
        <RouterProvider router={Router} />
      </ConfigProvider>
      <LoadingBarContainer />
    </>
  );
}

export default PublishApp;
