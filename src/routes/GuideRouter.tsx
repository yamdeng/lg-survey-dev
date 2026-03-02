/* publish 관련 가이드 컴포넌트 import */
import PBasicInput from '@/guide/publish/PBasicInput';
import PCheckboxRadio from '@/guide/publish/PCheckboxRadio';
import PDatePicker from '@/guide/publish/PDatePicker';
import PSelect from '@/guide/publish/PSelect';
import PTextInput from '@/guide/publish/PTextInput';
import PLoadingBar from '@/guide/publish/PLoadingBar';
import PAlertConfirmModal from '@/guide/publish/PAlertConfirmModal';

/* dev 관련 가이드 컴포넌트 import */
import GuideButton from '@/guide/dev/GuideButton';
import GuideNavigate from '@/guide/dev/GuideNavigate';
import GuideToastService from '@/guide/dev/GuideToastService';
import GuideLoadingBar from '@/guide/dev/GuideLoadingBar';
import GuideError from '@/guide/dev/GuideError';
import GuideApiService from '@/guide/dev/GuideApiService';
import GuideAlertConfirmModal from '@/guide/dev/GuideAlertConfirmModal';
import GuideModalService from '@/guide/dev/GuideModalService';
import GuideCodeService from '@/guide/dev/GuideCodeService';

/* guide common component */
import GuideAppTextInput from '@/guide/dev/GuideAppTextInput';
import GuideAppTextEditor from '@/guide/dev/GuideAppTextEditor';
import GuideAppCheckbox from '@/guide/dev/GuideAppCheckbox';
import GuideAppSelect from '@/guide/dev/GuideAppSelect';
import GuideAppCodeSelect from '@/guide/dev/GuideAppCodeSelect';
import GuideAppDatePicker from '@/guide/dev/GuideAppDatePicker';
import GuideAppDatePicker2 from '@/guide/dev/GuideAppDatePicker2';
import GuideAppTimePicker from '@/guide/dev/GuideAppTimePicker';
import GuideAppRangeDatePicker from '@/guide/dev/GuideAppRangeDatePicker';
import GuideAppRangeDatePicker2 from '@/guide/dev/GuideAppRangeDatePicker2';

/* immer, zustand, yup */
import GuideImmer1 from '@/guide/dev/GuideImmer1';
import GuideImmer2 from '@/guide/dev/GuideImmer2';
import GuideZustandCreateFunction from '@/guide/dev/store/GuideZustandCreateFunction';
import GuideZustandCreateStoreFunction from '@/guide/dev/store/GuideZustandCreateStoreFunction';
import GuideZustandNestedPropsUpdate from '@/guide/dev/store/GuideZustandNestedPropsUpdate';
import GuideZustandImmer from '@/guide/dev/store/GuideZustandImmer';
import GuideZustandImmerMiddleware from '@/guide/dev/store/GuideZustandImmerMiddleware';
import GuideZustandStoreCommunication from '@/guide/dev/store/GuideZustandStoreCommunication';
import GuideZustandSliceCase1 from '@/guide/dev/store/GuideZustandSliceCase1';
import GuideZustandSliceCase2 from '@/guide/dev/store/GuideZustandSliceCase2';
import GuideYupCase1 from '@/guide/dev/GuideYupCase1';
import GuideYupCase2 from '@/guide/dev/GuideYupCase2';
import GuideYupCase3 from '@/guide/dev/GuideYupCase3';

/* guide common table component */
import GuideTableBasic from '@/guide/dev/table/GuideTableBasic';
import GuideTableClick from '@/guide/dev/table/GuideTableClick';
import GuideTableOnlySingleSelect from '@/guide/dev/table/GuideTableOnlySingleSelect';
import GuideTableSelect from '@/guide/dev/table/GuideTableSelect';
import GuideTableSeletable from '@/guide/dev/table/GuideTableSeletable';
import GuideTableCodeLabel from '@/guide/dev/table/GuideTableCodeLabel';
import GuideTableButton from '@/guide/dev/table/GuideTableButton';
import GuideTableUseStore1 from '@/guide/dev/table/GuideTableUseStore1';
import GuideTableUseStore2 from '@/guide/dev/table/GuideTableUseStore2';

/* 개발 패턴 component */
import GuidePatternTable1 from '@/guide/dev-pattern/GuidePatternTable1';
import GuidePatternTable2 from '@/guide/dev-pattern/GuidePatternTable2';
import GuidePatternTable3 from '@/guide/dev-pattern/GuidePatternTable3';
import GuidePatternForm1 from '@/guide/dev-pattern/GuidePatternForm1';
import GuidePatternForm2 from '@/guide/dev-pattern/GuidePatternForm2';
// import GuidePatternStoreForm from '@/guide/dev-pattern/GuidePatternStoreForm';

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
            path: 'GuideButton',
            element: <GuideButton />,
            handle: { breadcrumbName: '버튼' },
          },
          {
            path: 'GuideNavigate',
            element: <GuideNavigate />,
            handle: { breadcrumbName: '네비게이션' },
          },
          {
            path: 'GuideToastService',
            element: <GuideToastService />,
            handle: { breadcrumbName: '토스트서비스' },
          },
          {
            path: 'GuideLoadingBar',
            element: <GuideLoadingBar />,
            handle: { breadcrumbName: '로딩바' },
          },
          {
            path: 'GuideError',
            element: <GuideError />,
            handle: { breadcrumbName: '에러 case' },
          },
          {
            path: 'GuideApiService',
            element: <GuideApiService />,
            handle: { breadcrumbName: 'ApiService' },
          },
          {
            path: 'GuideAlertConfirmModal',
            element: <GuideAlertConfirmModal />,
            handle: { breadcrumbName: 'alert, confirm 모달' },
          },
          {
            path: 'GuideModalService',
            element: <GuideModalService />,
            handle: { breadcrumbName: 'ModalService' },
          },
          {
            path: 'GuideCodeService',
            element: <GuideCodeService />,
            handle: { breadcrumbName: 'CodeService' },
          },
          {
            path: 'GuideAppTextInput',
            element: <GuideAppTextInput />,
            handle: { breadcrumbName: 'textinput, searchinput' },
          },
          {
            path: 'GuideAppTextEditor',
            element: <GuideAppTextEditor />,
            handle: { breadcrumbName: 'editor' },
          },
          {
            path: 'GuideAppCheckbox',
            element: <GuideAppCheckbox />,
            handle: { breadcrumbName: 'checkbox, radio' },
          },
          {
            path: 'GuideAppSelect',
            element: <GuideAppSelect />,
            handle: { breadcrumbName: 'select' },
          },
          {
            path: 'GuideAppCodeSelect',
            element: <GuideAppCodeSelect />,
            handle: { breadcrumbName: 'code-select' },
          },
          {
            path: 'GuideAppDatePicker',
            element: <GuideAppDatePicker />,
            handle: { breadcrumbName: 'date-picker' },
          },
          {
            path: 'GuideAppDatePicker2',
            element: <GuideAppDatePicker2 />,
            handle: { breadcrumbName: 'date-picker2' },
          },
          {
            path: 'GuideAppTimePicker',
            element: <GuideAppTimePicker />,
            handle: { breadcrumbName: 'time-picker' },
          },
          {
            path: 'GuideAppRangeDatePicker',
            element: <GuideAppRangeDatePicker />,
            handle: { breadcrumbName: 'date-range-picker' },
          },
          {
            path: 'GuideAppRangeDatePicker2',
            element: <GuideAppRangeDatePicker2 />,
            handle: { breadcrumbName: 'date-range-picker2' },
          },
          {
            path: 'GuideImmer1',
            element: <GuideImmer1 />,
            handle: { breadcrumbName: 'immer 라이브러리 object case' },
          },
          {
            path: 'GuideImmer2',
            element: <GuideImmer2 />,
            handle: { breadcrumbName: 'immer 라이브러리 list case' },
          },
          {
            path: 'GuideZustandCreateFunction',
            element: <GuideZustandCreateFunction />,
            handle: { breadcrumbName: 'zustand create' },
          },
          {
            path: 'GuideZustandCreateStoreFunction',
            element: <GuideZustandCreateStoreFunction />,
            handle: { breadcrumbName: 'zustand createStore' },
          },
          {
            path: 'GuideZustandNestedPropsUpdate',
            element: <GuideZustandNestedPropsUpdate />,
            handle: { breadcrumbName: 'zustand 내부 속성 변경 방법' },
          },
          {
            path: 'GuideZustandImmer',
            element: <GuideZustandImmer />,
            handle: { breadcrumbName: 'zustand + immer' },
          },
          {
            path: 'GuideZustandImmerMiddleware',
            element: <GuideZustandImmerMiddleware />,
            handle: { breadcrumbName: 'zustand + immer middleware' },
          },
          {
            path: 'GuideZustandStoreCommunication',
            element: <GuideZustandStoreCommunication />,
            handle: { breadcrumbName: 'store 간의 소통 방법' },
          },
          {
            path: 'GuideZustandSliceCase1',
            element: <GuideZustandSliceCase1 />,
            handle: { breadcrumbName: 'zustand slice 예시1' },
          },
          {
            path: 'GuideZustandSliceCase2',
            element: <GuideZustandSliceCase2 />,
            handle: { breadcrumbName: 'zustand slice 예시2' },
          },
          {
            path: 'GuideYupCase1',
            element: <GuideYupCase1 />,
            handle: { breadcrumbName: 'yup 예시1' },
          },
          {
            path: 'GuideYupCase2',
            element: <GuideYupCase2 />,
            handle: { breadcrumbName: 'yup 예시2' },
          },
          {
            path: 'GuideYupCase3',
            element: <GuideYupCase3 />,
            handle: { breadcrumbName: 'yup 예시3' },
          },
          {
            path: 'GuideTableBasic',
            element: <GuideTableBasic />,
            handle: { breadcrumbName: 'table-basic' },
          },
          {
            path: 'GuideTableClick',
            element: <GuideTableClick />,
            handle: { breadcrumbName: 'table-click' },
          },
          {
            path: 'GuideTableOnlySingleSelect',
            element: <GuideTableOnlySingleSelect />,
            handle: { breadcrumbName: 'table select(only single)' },
          },
          {
            path: 'GuideTableSelect',
            element: <GuideTableSelect />,
            handle: { breadcrumbName: 'table-select' },
          },
          {
            path: 'GuideTableSeletable',
            element: <GuideTableSeletable />,
            handle: { breadcrumbName: 'table-selectable' },
          },
          {
            path: 'GuideTableCodeLabel',
            element: <GuideTableCodeLabel />,
            handle: { breadcrumbName: 'table-code-use' },
          },
          {
            path: 'GuideTableButton',
            element: <GuideTableButton />,
            handle: { breadcrumbName: 'table-button' },
          },
          {
            path: 'GuideTableUseStore1',
            element: <GuideTableUseStore1 />,
            handle: { breadcrumbName: 'table-store 상세 연동 1' },
          },
          {
            path: 'GuideTableUseStore2',
            element: <GuideTableUseStore2 />,
            handle: { breadcrumbName: 'table-store 상세 연동 2' },
          },
        ],
      },
      {
        path: 'dev-pattern',
        handle: { breadcrumbName: '개발 패턴 가이드' },
        children: [
          {
            path: 'GuidePatternTable1',
            element: <GuidePatternTable1 />,
            handle: { breadcrumbName: '목록 개발 패턴1' },
          },
          {
            path: 'GuidePatternTable2',
            element: <GuidePatternTable2 />,
            handle: { breadcrumbName: '목록 개발 패턴2' },
          },
          {
            path: 'GuidePatternTable3',
            element: <GuidePatternTable3 />,
            handle: { breadcrumbName: '목록 개발 패턴3' },
          },
          {
            path: 'GuidePatternForm1',
            element: <GuidePatternForm1 />,
            handle: { breadcrumbName: '폼 개발 패턴1' },
          },
          {
            path: 'GuidePatternForm2',
            element: <GuidePatternForm2 />,
            handle: { breadcrumbName: '폼 개발 패턴2' },
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
