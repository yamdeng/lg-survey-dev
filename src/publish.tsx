import 'dayjs/locale/en';
import 'dayjs/locale/ko';
import { setAutoFreeze } from 'immer';
import { createRoot } from 'react-dom/client';
import { Router } from '@/publish/Router';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import { customTheme } from '@/publish/customTheme';

/* aggrind 전역 setting */
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);

/* css import */
// 라이브러리 css import
import 'react-toastify/dist/ReactToastify.css';
import 'react-tooltip/dist/react-tooltip.css';
import 'react-quill-new/dist/quill.snow.css';
import 'react-quill-new/dist/quill.bubble.css';

// 프로젝트 import
import '@/resources/css/index.scss';
import './yupLocale';

setAutoFreeze(false);

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <ConfigProvider theme={customTheme}>
      <RouterProvider router={Router} />
    </ConfigProvider>
  </ErrorBoundary>,
);
