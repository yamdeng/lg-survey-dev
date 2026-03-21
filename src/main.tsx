import { customTheme } from '@/publish/customTheme';
import { ConfigProvider } from 'antd';
import koKR from 'antd/locale/ko_KR';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/ko';
import { setAutoFreeze } from 'immer';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Router } from '@/routes/MainRouter.tsx';

import advancedFormat from 'dayjs/plugin/advancedFormat';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(quarterOfYear);
dayjs.extend(advancedFormat);
dayjs.extend(relativeTime);
dayjs.locale('ko');

/* aggrind 전역 setting */
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);

// 프로젝트 import
import '@/resources/css/index.scss';
import App from './App.tsx';
import './yupLocale';

setAutoFreeze(false);

createRoot(document.getElementById('root')!).render(
  <ConfigProvider
    theme={customTheme}
    locale={koKR}
    modal={{
      className: 'survey',
    }}
  >
    <App>
      <RouterProvider router={Router} />
    </App>
  </ConfigProvider>,
);
