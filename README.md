# react-web

## Axios（装饰器） 配置

1. 依赖安装

```bash
npm install axios # 安装axios
npm install reflect-metadata # 安装reflect-metadata 用于装饰器元数据
```

2. 配置axios核心实例+拦截器
3. 配置核心装饰器工厂 + 各种请求装饰器
4. 下载对应babel插件

```bash
npm install -D @babel/plugin-syntax-decorators
```

## 集成Tailwind CSS

npm install tailwindcss @tailwindcss/vite

```js
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [tailwindcss()]
})
```

## 集成react-router

npm install react-router-dom

## 集成zustand

npm install zustand

## 自定义SVG组件

npm install --save-dev vite-plugin-svgr
