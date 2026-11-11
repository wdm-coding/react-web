import { defineConfig,loadEnv  } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  console.log(env)
  return {
  base: env.VITE_BASE_PATH,
  plugins: [
    react(),
    babel({
      presets: [reactCompilerPreset()],
      plugins: [['@babel/plugin-syntax-decorators', { legacy: true }]],
    }),
    tailwindcss(),
    svgr({ svgrOptions: { icon: true } }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[name]__[local]--[hash:base64:5]',
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@use '@/styles/variables.scss' as *;`,
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://sjdj.gansu.gov.cn/register-client',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api'), // 重写路径
      },
    },
  },
}
});
