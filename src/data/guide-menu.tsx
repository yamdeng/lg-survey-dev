import { SquareCode } from 'lucide-react';

/* 가이드 전용 메뉴 */
export const guideMenuList = [
  {
    menuTitle: '개발 가이드',
    icon: <SquareCode />,
    children: [
      {
        menuTitle: '공통 가이드',
        children: [
          {
            menuTitle: '네비게이션',
            menuPath: '/guides/dev/GuideNavigate',
          },
          {
            menuTitle: '토스트',
            menuPath: '/guides/dev/GuideToastService',
          },
          {
            menuTitle: '로딩바',
            menuPath: '/guides/dev/GuideLoadingBar',
          },
          {
            menuTitle: '에러 case',
            menuPath: '/guides/dev/GuideError',
          },
          {
            menuTitle: 'ApiService',
            menuPath: '/guides/dev/GuideApiService',
          },
          {
            menuTitle: 'alert, confirm 모달',
            menuPath: '/guides/dev/GuideAlertConfirmModal',
          },
          {
            menuTitle: 'ModalService',
            menuPath: '/guides/dev/GuideModalService',
          },
          {
            menuTitle: 'CodeService',
            menuPath: '/guides/dev/GuideCodeService',
          },
        ],
      },
      {
        menuTitle: 'input 가이드',
        children: [
          {
            menuTitle: 'textinput, searchinput',
            menuPath: '/guides/dev/GuideAppTextInput',
          },
          {
            menuTitle: 'editor',
            menuPath: '/guides/dev/GuideAppTextEditor',
          },
          {
            menuTitle: 'checkbox, radio',
            menuPath: '/guides/dev/GuideAppCheckbox',
          },
          {
            menuTitle: 'select',
            menuPath: '/guides/dev/GuideAppSelect',
          },
          {
            menuTitle: 'code-select',
            menuPath: '/guides/dev/GuideAppCodeSelect',
          },
          {
            menuTitle: 'date-picker',
            menuPath: '/guides/dev/GuideAppDatePicker',
          },
          {
            menuTitle: 'date-picker2',
            menuPath: '/guides/dev/GuideAppDatePicker2',
          },
          {
            menuTitle: 'time-picker',
            menuPath: '/guides/dev/GuideAppTimePicker',
          },
          {
            menuTitle: 'date-range-picker',
            menuPath: '/guides/dev/GuideAppRangeDatePicker',
          },
          {
            menuTitle: 'date-range-picker2',
            menuPath: '/guides/dev/GuideAppRangeDatePicker2',
          },
        ],
      },
      {
        menuTitle: '개발 패턴 가이드',
        children: [
          {
            menuTitle: 'table 검색1',
            menuPath: '/guides/dev-pattern/GuidePatternTable1',
          },
        ],
      },
      {
        menuTitle: '퍼블리싱 가이드',
        children: [
          {
            menuTitle: 'input 전체 모음',
            menuPath: '/guides/publish/PBasicInput',
          },
          {
            menuTitle: 'text input(textarea)',
            menuPath: '/guides/publish/PTextInput',
          },
          {
            menuTitle: 'radio, checkbox',
            menuPath: '/guides/publish/PCheckboxRadio',
          },
          {
            menuTitle: 'datepicker',
            menuPath: '/guides/publish/PDatePicker',
          },
          {
            menuTitle: 'select',
            menuPath: '/guides/publish/PSelect',
          },
          {
            menuTitle: 'AlertConfirmModal',
            menuPath: '/guides/publish/PAlertConfirmModal',
          },
          {
            menuTitle: 'LoadingBar',
            menuPath: '/guides/publish/PLoadingBar',
          },
        ],
      },
    ],
  },
];
