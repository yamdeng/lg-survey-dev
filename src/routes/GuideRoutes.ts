/* publish 관련 가이드 컴포넌트 import */
import PBasicInput from '@/guide/publish/PBasicInput';
import PCheckboxRadio from '@/guide/publish/PCheckboxRadio';
import PDatePicker from '@/guide/publish/PDatePicker';
import PSelect from '@/guide/publish/PSelect';
import PTextInput from '@/guide/publish/PTextInput';

/* dev 관련 가이드 컴포넌트 import */
import GuideNavigate from '@/guide/dev/GuideNavigate';
import GuideToastService from '@/guide/dev/GuideToastService';

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
  ],
};

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
  ],
};
