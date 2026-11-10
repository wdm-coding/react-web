import type { StateCreator } from 'zustand'
import type { GlobalSlice } from '../types'



const createGlobalSlice: StateCreator<
  GlobalSlice,
  [['zustand/persist', unknown], ['zustand/immer', never]],
  [],
  GlobalSlice
> = (set) => ({
  collapsed: false,
  toggleCollapsed: () =>
    set((state) => {
      state.collapsed = !state.collapsed
    })
})

export default createGlobalSlice
