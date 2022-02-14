import legacy from '@vitejs/plugin-legacy';
import reactRefresh from '@vitejs/plugin-react-refresh';
import path from 'path';
import { defineConfig } from 'vite';

/** 简写路径 */
function resolve(dir: string) {
  console.log(__dirname);
  return `${path.resolve(__dirname, dir)}/`;
}

console.log(__dirname);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    legacy({
      targets: '',
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    }),
  ],
  resolve: {
    alias: {
      '@/': resolve('src/'),
      common: resolve('src/common'),
      mock: resolve('mock'),
    },
  },
  server: {
    /** 本地服务器端口设置 */
    port: 3000,
    /** 代理服务器设置示例 */
    proxy: {
      '/api': {
        // 以/api开头的接口都代理到target指定的域名下
        target: 'http://127.0.0.1:4000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/mock': {
        // 以/mock开头的接口都代理到target指定的域名下
        target: 'http://127.0.0.1:4000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/mock/, '/mock'),
      },
    },
  },
  build: {
    outDir: 'dist',
  },
});
