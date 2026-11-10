import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { createUserSlice, type UserSlice } from './modules/user'
import { createGlobalSlice, type GlobalSlice } from './modules/global'

/** 所有切片的聚合状态类型 */
export type BoundState = UserSlice & GlobalSlice

export const useBoundStore = create<BoundState>()(
  persist(
    immer((...a) => ({
      ...createUserSlice(...a),
      ...createGlobalSlice(...a)
    })),
    {
      name: 'bound-store',
      partialize: (state) => ({
        collapsed: state.collapsed,
        userInfo: state.userInfo
      }),
      storage: createJSONStorage(() => window.sessionStorage)
    }
  )
)
