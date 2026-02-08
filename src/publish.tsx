import 'dayjs/locale/en';
import 'dayjs/locale/ko';
import { setAutoFreeze } from 'immer';
import { createRoot } from 'react-dom/client';
import { unstable_HistoryRouter as Router } from 'react-router-dom';
import { ModuleRegistry, ClientSideRowModelModule, ValidationModule } from 'ag-grid-community';
ModuleRegistry.registerModules([ClientSideRowModelModule, ValidationModule]);
import PublishApp from './PublishApp.tsx';
import history from './utils/history.ts';
import './yupLocale';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-tooltip/dist/react-tooltip.css';

setAutoFreeze(false);

const AppComponent = <PublishApp />;
const basename = import.meta.env.VITE_SERVER_CONTEXT_PATH || '/';

createRoot(document.getElementById('root')!).render(
  <Router history={history as any} basename={basename}>
    {AppComponent}
  </Router>,
);
