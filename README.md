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
1. 安装依赖
```bash
npm install tailwindcss @tailwindcss/vite
```
2. 配置tailwindcss
```js
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
```

## 集成react-router
1. 安装依赖
```bash
npm install react-router-dom
```
2. 配置路由
```js
import { createBrowserRouter } from 'react-router-dom'
```

## 集成zustand
1. 安装依赖
```bash
npm install zustand
```

2. 配置zustand
```js
import { create } from 'zustand'
const useStore = create((set) => ({
  count: 0,
  inc: () => set(s => ({ count: s.count + 1 })),
  dec: () => set(s => ({ count: s.count - 1 })),
}));
```

3. Slice 模式
```js
import { create } from 'zustand'
import { createBearSlice } from './bearSlice'
import { createFishSlice } from './fishSlice'

export const createFishSlice = (set) => ({
  fishes: 0,
  addFish: () => set((state) => ({ fishes: state.fishes + 1 })),
})

export const createBearSlice = (set) => ({
  bears: 0,
  addBear: () => set((state) => ({ bears: state.bears + 1 })),
  eatFish: () => set((state) => ({ fishes: state.fishes - 1 })),
})

export const useBoundStore = create((...a) => ({
  ...createBearSlice(...a),
  ...createFishSlice(...a),
}))
```
