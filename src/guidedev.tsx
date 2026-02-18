import 'dayjs/locale/en';
import 'dayjs/locale/ko';
import { setAutoFreeze } from 'immer';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
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
import 'react-quill/dist/quill.snow.css';

// 프로젝트 import
import '@/resources/css/index.scss';
import '@/publish/components/test/publish-dev.scss';

import GuideDevApp from './GuideDevApp.tsx';
import './yupLocale';

setAutoFreeze(false);

const AppComponent = <GuideDevApp />;
const basename = '/';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename={basename}>
    <ErrorBoundary>
      <ConfigProvider theme={customTheme}>{AppComponent}</ConfigProvider>
    </ErrorBoundary>
  </BrowserRouter>,
);
