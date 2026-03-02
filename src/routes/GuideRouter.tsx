/* publish 관련 가이드 컴포넌트 import */
import PBasicInput from '@/guide/publish/PBasicInput';
import PCheckboxRadio from '@/guide/publish/PCheckboxRadio';
import PDatePicker from '@/guide/publish/PDatePicker';
import PSelect from '@/guide/publish/PSelect';
import PTextInput from '@/guide/publish/PTextInput';
import PLoadingBar from '@/guide/publish/PLoadingBar';
import PAlertConfirmModal from '@/guide/publish/PAlertConfirmModal';

/* dev 관련 가이드 컴포넌트 import */
import GuideNavigate from '@/guide/dev/GuideNavigate';
import GuideToastService from '@/guide/dev/GuideToastService';
import GuideApiService from '@/guide/dev/GuideApiService';
import GuideAlertConfirmModal from '@/guide/dev/GuideAlertConfirmModal';
import GuideModalService from '@/guide/dev/GuideModalService';
import GuideCookie from '@/guide/dev/GuideCookie';
import GuideError from '@/guide/dev/GuideError';

/* guide common component */
import GuideAppTextInput from '@/guide/dev/GuideAppTextInput';
import GuideAppTextEditor from '@/guide/dev/GuideAppTextEditor';
import GuideAppCheckbox from '@/guide/dev/GuideAppCheckbox';
import GuideAppSelect from '@/guide/dev/GuideAppSelect';
import GuideAppDatePicker from '@/guide/dev/GuideAppDatePicker';
import GuideAppDatePicker2 from '@/guide/dev/GuideAppDatePicker2';
import GuideAppTimePicker from '@/guide/dev/GuideAppTimePicker';
import GuideAppRangeDatePicker from '@/guide/dev/GuideAppRangeDatePicker';
import GuideAppRangeDatePicker2 from '@/guide/dev/GuideAppRangeDatePicker2';
import GuideAppAutoComplete from '@/guide/dev/GuideAppAutoComplete';

/* guide common table component */
import GuideTableCase1 from '@/guide/dev/GuideTableCase1';
import GuideTableCase2 from '@/guide/dev/GuideTableCase2';
import GuideTableCase3 from '@/guide/dev/GuideTableCase3';
import GuideTableCase4 from '@/guide/dev/GuideTableCase4';

/* 개발 패턴 component */
import GuidePatternTable1 from '@/guide/dev-pattern/GuidePatternTable1';
import GuidePatternTable2 from '@/guide/dev-pattern/GuidePatternTable2';
import GuidePatternTable3 from '@/guide/dev-pattern/GuidePatternTable3';
import GuidePatternTable4 from '@/guide/dev-pattern/GuidePatternTable4';
import GuidePatternForm1 from '@/guide/dev-pattern/GuidePatternForm1';
import GuidePatternStoreForm from '@/guide/dev-pattern/GuidePatternStoreForm';
import GuidePatternDetail1 from '@/guide/dev-pattern/GuidePatternDetail1';

export const GuideRouter = [
  {
    path: 'guides',
    handle: { breadcrumbName: '개발 가이드' },
    children: [
      {
        path: 'dev',
        handle: { breadcrumbName: '공통 가이드' },
        children: [
          {
            path: 'GuideNavigate',
            element: <GuideNavigate />,
            handle: { breadcrumbName: '네비게이션' },
          },
          {
            path: 'GuideToastService',
            element: <GuideToastService />,
          },
        ],
      },
      {
        path: 'dev-pattern',
        children: [
          {
            path: 'GuidePatternTable1',
            element: <GuidePatternTable1 />,
          },
        ],
      },
      {
        path: 'publish',
        children: [
          {
            path: 'PBasicInput',
            element: <PBasicInput />,
          },
          {
            path: 'PTextInput',
            element: <PTextInput />,
          },
          {
            path: 'PCheckboxRadio',
            element: <PCheckboxRadio />,
          },
          {
            path: 'PDatePicker',
            element: <PDatePicker />,
          },
          {
            path: 'PSelect',
            element: <PSelect />,
          },
          {
            path: 'PAlertConfirmModal',
            element: <PAlertConfirmModal />,
          },
          {
            path: 'PLoadingBar',
            element: <PLoadingBar />,
          },
        ],
      },
    ],
  },
];
