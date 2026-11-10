import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import type { BoundState } from './types'

/** 切片模块结构：模块文件必须默认导出切片创建函数 */
type SliceModule = {
  default: (set: any, get: any, api: any) => Partial<BoundState>
}

/** 自动扫描 modules 目录下的切片模块，新增切片只需新增模块文件 */
const sliceModules = import.meta.glob<SliceModule>('./modules/*.ts', {
  eager: true
})

export const useBoundStore = create<BoundState>()(
  persist(
    immer((...a) =>
      Object.values(sliceModules).reduce<BoundState>(
        (boundState, { default: createSlice }) => ({
          ...boundState,
          ...createSlice(...a)
        }),
        {} as BoundState
      )
    ),
    {
      name: 'zustand-store',
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        userInfo: state.userInfo
      }),
      storage: createJSONStorage(() => window.sessionStorage)
    }
  )
)
