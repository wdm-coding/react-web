import type { StateCreator } from 'zustand'

export interface GlobalSlice {
  /** 侧边菜单是否收起 */
  collapsed: boolean
  /** 切换侧边菜单收起状态 */
  toggleCollapsed: () => void
}

export const createGlobalSlice: StateCreator<
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
