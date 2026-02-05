import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // env 폴더에 반영된 환경변수 정보 가져오기
  const env = loadEnv(mode, resolve(__dirname, './env'), '');

  const pluginList = [react(), tsconfigPaths()];
  const VITE_API_LOCAL_URL = env.VITE_API_LOCAL_URL;
  const VITE_API_URL = env.VITE_API_URL;
  const currentFolderPath = resolve(__dirname);
  console.log(`mode : ${mode}`);
  console.log(`currentFolderPath : ${currentFolderPath}`);
  console.log(`loadEnv env VITE_API_URL : ${env.VITE_API_URL}`);
  console.log(`enableHttps : ${env.ENABLE_HTTPS}`);
  console.log(`VITE_API_LOCAL_URL : ${VITE_API_LOCAL_URL}`);
  console.log(`VITE_API_URL : ${VITE_API_URL}`);

  return {
    define: {
      __PROJECT_FOLDER_PATH: JSON.stringify(currentFolderPath),
    },
    base: '/',
    envDir: './env',
    plugins: pluginList,
    server: {
      strictPort: false,
      open: true,
      host: '0.0.0.0'
    },
  };
});

