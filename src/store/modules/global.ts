import type { StateCreator } from 'zustand'
import type { GlobalSlice } from '../types'
import { getEnvConfig } from '@/utils/common'
console.log('当前环境变量', getEnvConfig())
// 全局状态管理
const createGlobalSlice: StateCreator<
  GlobalSlice,
  [['zustand/persist', unknown], ['zustand/immer', never]],
  [],
  GlobalSlice
> = (set, get) => ({
  siteName: '甘肃省公共数据资源登记平台',
  env: getEnvConfig().mode,
  loginType: getEnvConfig().loginType,
  storage: {},
  authModal: {
    isOpen: false,
    content: null,
    open: (content) => {
      set((state) => {
        state.authModal.isOpen = true
        state.authModal.content = content ?? null
      })
    },
    close: () => {
      set((state) => {
        state.authModal.isOpen = false
      })
    }
  },
  setItem: (key, value) =>
    set((state) => {
      state.storage[key] = value
    }),
  getItem: (key) => get().storage[key],
  removeItem: (key) =>
    set((state) => {
      const storage = { ...state.storage }
      delete storage[key]
      state.storage = storage
    }),
  clearStorage: () =>
    set((state) => {
      state.storage = {}
    })
})

export default createGlobalSlice
