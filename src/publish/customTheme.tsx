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
  },
  cssVar: {
    prefix: 'sv', // CSS 변수 접두사 설정
  },
  components: {
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
