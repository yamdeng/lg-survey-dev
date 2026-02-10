import { theme } from 'antd';
import type { ThemeConfig } from 'antd';

export const customTheme: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    // colorPrimary: '#2563EB',
    colorPrimary: '#a50934', // LG RED : #a50934 165 0 52
    borderRadius: 4,
    fontSize: 14,
    fontFamily: '"LG EI Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',

    colorBorderSecondary: 'rgba(5, 5, 5, 0.06)',
    colorLink: '#a50934',
    colorLinkHover: '#bd1746',
    colorLinkActive: '#8b032a',
  },
  cssVar: {
    prefix: 'sv', // CSS 변수 접두사 설정
  },

  components: {
    Menu: {
      // 메뉴 컴포넌트 특화 토큰 변경
      // itemBg: '#f0f2f5',
      // itemColor: '#333',
      // Menu 전체 배경색
      // colorBgContainer: '#f0f2f5',
      // // 메뉴 아이템 배경색 (필요 시)
      // itemBg: '#f0f2f5',
      // // 서브메뉴 배경색 (필요 시)
      // subMenuItemBg: '#f0f2f5',
      // Menu 컴포넌트 전용 토큰 설정
      // darkItemBg: '#222',
      // darkSubMenuItemBg: '#111',
      // itemColor: '#fff',
      // itemHoverBg: '#444',
      // itemSelectedBg: '#333',
      collapsedWidth: 60,
    },
    Button: {
      colorPrimary: '#a50934',
      algorithm: true, // 로딩/활성 상태 색상 자동 계산
    },
    Input: {
      borderRadius: 2,
    },
    Select: {
      colorPrimary: '#a50934',
    },
  },
};
