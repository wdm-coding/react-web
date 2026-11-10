import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export interface UserState {
  userInfo: Record<string, any> | null
}
export const userSlice = create<UserState>()(
  persist(
    immer((set) => ({
      userInfo: null
    })),
    {
      name: 'user',
      partialize: (state) => ({
        userInfo: state.userInfo,
      }),
      storage: createJSONStorage(() => window.sessionStorage)
    }
  )
)
