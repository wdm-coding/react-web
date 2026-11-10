import type { StateCreator } from 'zustand'

export interface UserSlice {
  /** 当前登录用户信息 */
  userInfo: Record<string, any> | null
  /** 设置用户信息 */
  setUserInfo: (userInfo: UserSlice['userInfo']) => void
  /** 清除用户信息 */
  clearUserInfo: () => void
}

export const createUserSlice: StateCreator<
  UserSlice,
  [['zustand/persist', unknown], ['zustand/immer', never]],
  [],
  UserSlice
> = (set) => ({
  userInfo: null,
  setUserInfo: (userInfo) => set({ userInfo }),
  clearUserInfo: () => set({ userInfo: null })
})
