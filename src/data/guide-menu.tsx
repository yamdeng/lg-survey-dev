import { Laptop } from 'lucide-react';

/* 가이드 전용 메뉴 */
export const guideMenuList = [
  {
    menuTitle: '개발 가이드',
    icon: <Laptop />,
    children: [
      {
        menuTitle: '공통 가이드',
        children: [
          {
            menuTitle: 'navigate',
            menuPath: '/guides/dev/GuideNavigate',
          },
          {
            menuTitle: 'toast service',
            menuPath: '/guides/dev/GuideToastService',
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
