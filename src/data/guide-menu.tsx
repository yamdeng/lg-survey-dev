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
            menuTitle: '버튼',
            menuPath: '/guides/dev/GuideButton',
          },
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
        menuTitle: 'immer, zustand, yup',
        children: [
          {
            menuTitle: 'immer 라이브러리 object case',
            menuPath: '/guides/dev/GuideImmer1',
          },
          {
            menuTitle: 'immer 라이브러리 list case',
            menuPath: '/guides/dev/GuideImmer2',
          },
          {
            menuTitle: 'zustand create',
            menuPath: '/guides/dev/GuideZustandCreateFunction',
          },
          {
            menuTitle: 'zustand createStore',
            menuPath: '/guides/dev/GuideZustandCreateStoreFunction',
          },
          {
            menuTitle: 'zustand 내부 속성 변경 방법 예시',
            menuPath: '/guides/dev/GuideZustandNestedPropsUpdate',
          },
          {
            menuTitle: 'zustand + immer',
            menuPath: '/guides/dev/GuideZustandImmer',
          },
          {
            menuTitle: 'zustand + immer middleware',
            menuPath: '/guides/dev/GuideZustandImmerMiddleware',
          },
          {
            menuTitle: 'store 간의 소통 방법',
            menuPath: '/guides/dev/GuideZustandStoreCommunication',
          },
          {
            menuTitle: 'zustand slice 예시1',
            menuPath: '/guides/dev/GuideZustandSliceCase1',
          },
          {
            menuTitle: 'zustand slice 예시2',
            menuPath: '/guides/dev/GuideZustandSliceCase2',
          },
          {
            menuTitle: 'yup 예시1',
            menuPath: '/guides/dev/GuideYupCase1',
          },
          {
            menuTitle: 'yup 예시2',
            menuPath: '/guides/dev/GuideYupCase2',
          },
          {
            menuTitle: 'yup 예시3',
            menuPath: '/guides/dev/GuideYupCase3',
          },
          {
            menuTitle: 'yup 예시4',
            menuPath: '/guides/dev/GuideYupCase4',
          },
        ],
      },
      {
        menuTitle: 'modal',
        children: [
          {
            menuTitle: 'modal basic',
            menuPath: '/guides/dev/GuideFormModal',
          },
          {
            menuTitle: 'modal list search',
            menuPath: '/guides/dev/GuideListSearchModal',
          },
        ],
      },
      {
        menuTitle: 'table',
        children: [
          {
            menuTitle: 'table basic',
            menuPath: '/guides/dev/GuideTableBasic',
          },
          {
            menuTitle: 'table click',
            menuPath: '/guides/dev/GuideTableClick',
          },
          {
            menuTitle: 'table select(only single)',
            menuPath: '/guides/dev/GuideTableOnlySingleSelect',
          },
          {
            menuTitle: 'table select',
            menuPath: '/guides/dev/GuideTableSelect',
          },
          {
            menuTitle: 'table select2',
            menuPath: '/guides/dev/GuideTableSelect2',
          },
          {
            menuTitle: 'table selectable',
            menuPath: '/guides/dev/GuideTableSeletable',
          },
          {
            menuTitle: 'table-code-use',
            menuPath: '/guides/dev/GuideTableCodeLabel',
          },
          {
            menuTitle: 'table-button',
            menuPath: '/guides/dev/GuideTableButton',
          },
          {
            menuTitle: 'table-store-use1',
            menuPath: '/guides/dev/GuideTableUseStore1',
          },
          {
            menuTitle: 'table-store-use2',
            menuPath: '/guides/dev/GuideTableUseStore2',
          },
          {
            menuTitle: 'table-batch-basic',
            menuPath: '/guides/dev/GuideTableBatchBasic',
          },
          {
            menuTitle: 'table-batch-basic2',
            menuPath: '/guides/dev/GuideTableBatchBasic2',
          },
          {
            menuTitle: 'table batch 행추가/삭제',
            menuPath: '/guides/dev/GuideTableBatchAddDelete',
          },
        ],
      },
      {
        menuTitle: '개발 패턴 가이드',
        children: [
          {
            menuTitle: 'table 검색1(store)',
            menuPath: '/guides/dev-pattern/GuidePatternTable1',
          },
          {
            menuTitle: 'table 검색2(immer)',
            menuPath: '/guides/dev-pattern/GuidePatternTable2',
          },
          {
            menuTitle: 'table 검색3',
            menuPath: '/guides/dev-pattern/GuidePatternTable3',
          },
          {
            menuTitle: 'form case 1 (store)',
            menuPath: '/guides/dev-pattern/GuidePatternForm1',
          },
          {
            menuTitle: 'form case 2 (immer)',
            menuPath: '/guides/dev-pattern/GuidePatternForm2',
          },
          {
            menuTitle: '테이블 batch 패턴 1',
            menuPath: '/guides/dev-pattern/GuidePatternTableBatch1',
          },
          {
            menuTitle: '테이블 batch 패턴 2',
            menuPath: '/guides/dev-pattern/GuidePatternTableBatch2',
          },
          {
            menuTitle: '테이블 batch 패턴 3',
            menuPath: '/guides/dev-pattern/GuidePatternTableBatch3',
          },
          {
            menuTitle: '테이블 batch 패턴 4',
            menuPath: '/guides/dev-pattern/GuidePatternTableBatch4',
          },
        ],
      },
      {
        menuTitle: '추가 개발 가이드',
        children: [
          {
            menuTitle: '검색 모달 인터페이스',
            menuPath: '/guides/dev-pattern/GuideSearchModal1',
          },
          {
            menuTitle: '검색 모달 인터페이스(store)',
            menuPath: '/guides/dev-pattern/GuideSearchModal2',
          },
          {
            menuTitle: '목록+폼모달(store + list선택연동)',
            menuPath: '/guides/dev-pattern/GuidePatternListWidthFormModalCase1',
          },
          {
            menuTitle: '목록+폼모달(store + 상세ID)',
            menuPath: '/guides/dev-pattern/GuidePatternListWidthFormModalCase2',
          },
          {
            menuTitle: '목록+폼모달(useImmer + list선택연동)',
            menuPath: '/guides/dev-pattern/GuidePatternListWidthFormModalCase3',
          },
          {
            menuTitle: '목록+폼(store + list선택연동)',
            menuPath: '/guides/dev-pattern/GuidePatternListWidthFormCase1',
          },
          {
            menuTitle: '목록+폼(store + 상세ID)',
            menuPath: '/guides/dev-pattern/GuidePatternListWidthFormCase2',
          },
          {
            menuTitle: '테이블간 선택 행 이동 case',
            menuPath: '/guides/dev-pattern/GuidePatternTwoListBatchCase1',
          },
          {
            menuTitle: '2 list edit : applyTransaction',
            menuPath: '/guides/dev-pattern/GuidePatternTwoListBatchCase2',
          },
          {
            menuTitle: '2 list edit : only store',
            menuPath: '/guides/dev-pattern/GuidePatternTwoListBatchCase3',
          },
          {
            menuTitle: '추가패턴 가이드1(좌측목록, 우측 폼, 목록)',
            menuPath: '/guides/dev-pattern/EtcGuide1',
          },
          {
            menuTitle: '사용자 input(id base로 인터페이스)',
            menuPath: '/guides/dev/GuideAppUserInput',
          },
        ],
      },
      {
        menuTitle: '퍼블리싱 가이드',
        children: [],
      },
    ],
  },
];
