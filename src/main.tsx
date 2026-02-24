import { customTheme } from '@/publish/customTheme';
import { ConfigProvider } from 'antd';
import 'dayjs/locale/en';
import 'dayjs/locale/ko';
import { setAutoFreeze } from 'immer';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Router } from '@/routes/MainRouter.tsx';

/* aggrind 전역 setting */
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);

/* css import */
// 라이브러리 css import
import 'react-quill-new/dist/quill.bubble.css';
import 'react-quill-new/dist/quill.snow.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-tooltip/dist/react-tooltip.css';

// 프로젝트 import
import '@/resources/css/index.scss';
import App from './App.tsx';
import './yupLocale';

setAutoFreeze(false);

createRoot(document.getElementById('root')!).render(
  <ConfigProvider theme={customTheme}>
    <App>
      <RouterProvider router={Router} />
    </App>
  </ConfigProvider>,
);
