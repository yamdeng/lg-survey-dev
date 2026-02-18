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

/* 개발 패턴 component */
import GuidePatternTable1 from '@/guide/dev-pattern/GuidePatternTable1';
import GuidePatternForm1 from '@/guide/dev-pattern/GuidePatternForm1';
import GuidePatternDetail1 from '@/guide/dev-pattern/GuidePatternDetail1';

/* 퍼블리싱 가이드 */
export const PublishRoutes = {
  list: [
    {
      title: 'input 전체 모음',
      Component: PBasicInput,
      path: 'PBasicInput',
      description: '',
      success: false,
    },
    {
      title: 'text input(textarea)',
      Component: PTextInput,
      path: 'PTextInput',
      description: '',
      success: false,
    },
    {
      title: 'radio, checkbox',
      Component: PCheckboxRadio,
      path: 'PCheckboxRadio',
      description: '',
      success: false,
    },
    {
      title: 'datepicker',
      Component: PDatePicker,
      path: 'PDatePicker',
      description: '',
      success: false,
    },
    {
      title: 'select',
      Component: PSelect,
      path: 'PSelect',
      description: '',
      success: false,
    },
    {
      title: 'AlertConfirmModal',
      Component: PAlertConfirmModal,
      path: 'PAlertConfirmModal',
      description: '',
      success: false,
    },
    {
      title: 'LoadingBar',
      Component: PLoadingBar,
      path: 'PLoadingBar',
      description: '',
      success: false,
    },
  ],
};

/* 공통 개발가이드 */
export const DevRoutes = {
  list: [
    {
      title: 'navigate',
      Component: GuideNavigate,
      path: 'GuideNavigate',
      description: '',
      success: false,
    },
    {
      title: 'toast service',
      Component: GuideToastService,
      path: 'GuideToastService',
      description: '',
      success: false,
    },
    {
      title: 'api service',
      Component: GuideApiService,
      path: 'GuideApiService',
      description: '',
      success: false,
    },
    {
      title: 'alert, confirm modal',
      Component: GuideAlertConfirmModal,
      path: 'GuideAlertConfirmModal',
      description: '',
      success: false,
    },
    {
      title: 'ModalService : alert, confirm modal',
      Component: GuideModalService,
      path: 'GuideModalService',
      description: '',
      success: false,
    },
    {
      title: 'cookie use',
      Component: GuideCookie,
      path: 'GuideCookie',
      description: '',
      success: false,
    },
    {
      title: 'error case',
      Component: GuideError,
      path: 'GuideError',
      description: '',
      success: false,
    },
    {
      title: 'common textinput, searchinput',
      Component: GuideAppTextInput,
      path: 'GuideAppTextInput',
      description: '',
      success: false,
    },
    {
      title: 'editor',
      Component: GuideAppTextEditor,
      path: 'GuideAppTextEditor',
      description: '',
      success: false,
    },
    {
      title: 'checkbox, radio',
      Component: GuideAppCheckbox,
      path: 'GuideAppCheckbox',
      description: '',
      success: false,
    },
    {
      title: 'select',
      Component: GuideAppSelect,
      path: 'GuideAppSelect',
      description: '',
      success: false,
    },
    {
      title: 'date-picker',
      Component: GuideAppDatePicker,
      path: 'GuideAppDatePicker',
      description: '',
      success: false,
    },
    {
      title: 'date-picker2',
      Component: GuideAppDatePicker2,
      path: 'GuideAppDatePicker2',
      description: '',
      success: false,
    },
    {
      title: 'time-picker',
      Component: GuideAppTimePicker,
      path: 'GuideAppTimePicker',
      description: '',
      success: false,
    },
    {
      title: 'date-range-picker',
      Component: GuideAppRangeDatePicker,
      path: 'GuideAppRangeDatePicker',
      description: '',
      success: false,
    },
    {
      title: 'date-range-picker2',
      Component: GuideAppRangeDatePicker2,
      path: 'GuideAppRangeDatePicker2',
      description: '',
      success: false,
    },
    {
      title: 'auto-complete1',
      Component: GuideAppAutoComplete,
      path: 'GuideAppAutoComplete',
      description: '',
      success: false,
    },
    {
      title: 'table-case1',
      Component: GuideTableCase1,
      path: 'GuideTableCase1',
      description: '',
      success: false,
    },
    {
      title: 'table-case2',
      Component: GuideTableCase2,
      path: 'GuideTableCase2',
      description: '',
      success: false,
    },
  ],
};

/* 개발 패턴 가이드 */
export const DevPatternRoutes = {
  list: [
    {
      title: 'table 검색1',
      Component: GuidePatternTable1,
      path: 'GuidePatternTable1',
      description: '',
      success: false,
    },
    {
      title: '게시글 폼 등록1',
      Component: GuidePatternForm1,
      path: 'GuidePatternForm1',
      description: '',
      success: false,
    },
    {
      title: '게시글 상세 1',
      Component: GuidePatternDetail1,
      path: 'GuidePatternDetail1',
      description: '',
      success: false,
    },
  ],
};
