import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // env 폴더에 반영된 환경변수 정보 가져오기
  const env = loadEnv(mode, resolve(__dirname, './env'), '');

  const pluginList = [react(), tsconfigPaths()];
  const enableProxyLog = env.ENABLE_PROXY_LOG && env.ENABLE_PROXY_LOG === 'true';
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
    build: {
      sourcemap: true,
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          admin: resolve(__dirname, 'admin.html'),
        },
      },
    },
    base: '/',
    envDir: './env',
    plugins: pluginList,
    server: {
      hmr: {
        overlay: true, // 에러 발생 시 오버레이를 띄우도록 명시
      },
      open: true,
      proxy: {
        '/api': {
          target: VITE_API_URL,
          changeOrigin: true,
          configure: (proxy: any) => {
            proxy.on('error', (err: any) => {
              if (enableProxyLog) {
                console.log('proxy error', err);
              }
            });
            proxy.on('proxyReq', (proxyReq: any, req: { method: any; url: any }) => {
              console.log('Sending Request to the Target:', req.method, req.url);
              if (enableProxyLog) {
                console.log('Sending Request to the Target:', req.method, req.url);
              }
            });
            proxy.on('proxyRes', (proxyRes: { statusCode: any }, req: { url: any }) => {
              console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
              if (enableProxyLog) {
                console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
              }
            });
          }
        },
      }
    },
  };
});

