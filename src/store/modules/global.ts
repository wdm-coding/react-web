import type { StateCreator } from 'zustand'
import type { GlobalSlice } from '../types'



const createGlobalSlice: StateCreator<
  GlobalSlice,
  [['zustand/persist', unknown], ['zustand/immer', never]],
  [],
  GlobalSlice
> = (set, get) => ({
  siteName: '甘肃省公共数据资源登记平台',
  storage: {},
  setItem: (key, value) => set((state) => {
    state.storage[key] = value
  }),
  getItem: (key) => get().storage[key],
  removeItem: (key) => set((state) => {
    const storage = { ...state.storage }
    delete storage[key]
    state.storage = storage
  }),
  clearStorage: () => set((state) => {
    state.storage = {}
  }),
})

export default createGlobalSlice
