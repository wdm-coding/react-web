import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export interface GlobalState {
  /** 侧边菜单是否收起 */
  collapsed: boolean
  /** 设置侧边菜单收起状态 */
  setCollapsed: (collapsed: GlobalState['collapsed']) => void
}

export const globalSlice = create<GlobalState>()(
  persist(
    immer((set) => ({
      collapsed: false,
      setCollapsed: (collapsed) => set((state) => (state.collapsed = collapsed))
    })),
    {
      name: 'global',
      partialize: (state) => ({
        collapsed: state.collapsed,
      }),
      storage: createJSONStorage(() => window.sessionStorage)
    }
  )
)
