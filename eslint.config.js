import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

export default defineConfig([
  // 1. 전역 무시 설정 (.history 포함)
  globalIgnores(['dist', 'public', '.history', 'node_modules']),

  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node, // 구버전의 env: { node: true } 대응
      },
    },
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      // --- Prettier 설정 (이전 프로젝트의 auto endOfLine 반영) ---
      'prettier/prettier': [
        'warn', // 또는 'error'
        {
          endOfLine: 'auto',
        },
      ],

      // --- React & Hooks (추천 규칙 포팅) ---
      'react-refresh/only-export-components': 'off', // 이전 프로젝트 설정 유지
      'react-hooks/exhaustive-deps': 'off', // 의존성 배열 검사 끔
      'react/react-in-jsx-scope': 'off', // React 19/18에서는 불필요
      'react/prop-types': 'off', // TS를 쓰므로 불필요
      'react/display-name': 'off',
      'react/no-unescaped-entities': 'off',
      'react/jsx-no-target-blank': 'off',

      // --- TypeScript (이전 프로젝트의 엄격/완화 규칙 포팅) ---
      '@typescript-eslint/no-unused-vars': 'error', // 쓰지 않는 변수는 에러로 처리
      '@typescript-eslint/no-explicit-any': 'off', // any 허용 (이전 프로젝트 설정)
      '@typescript-eslint/ban-ts-comment': 'off', // @ts-ignore 허용
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',

      // 특수 타입 허용 설정 ({})
      '@typescript-eslint/no-empty-object-type': 'off', // 최신 TS-ESLint 대응
    },
  },
  // 2. 마지막에 Prettier 설정을 추가하여 충돌 방지
  eslintConfigPrettier,
]);
