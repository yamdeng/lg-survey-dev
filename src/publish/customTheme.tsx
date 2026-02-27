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

  components: {
    Menu: {
      collapsedWidth: 80,
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
