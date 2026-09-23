import { defineConfig } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';
export default defineConfig({
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
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''), // 重写路径
      },
    },
  },
});
