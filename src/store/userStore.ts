import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import AuthApi from '@/api/auth.api'
import { setToken, clearCache } from '@/utils/storage'
import MenuApi from '@/api/systemManage/menu.api'

interface UserState {
  loginAfter: string
  userInfo: Record<string, any> | null
  menuTree: any[] | null
  fetchLogin: (loginParams: Record<string, any>) => Promise<void>
  fetchUserInfo: () => Promise<void>
  fetchMenuTree: () => Promise<void>
  userLogin: (loginParams: Record<string, any>) => Promise<any>
  userLogout: () => Promise<boolean>
}
export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      loginAfter: '/',
      userInfo: null,
      menuTree: null,
      fetchLogin: async (loginParams: Record<string, any>) => {
        const { code, data } = await AuthApi.userLogin(loginParams)
        if (code === 0) {
          setToken(data)
        }
      },
      fetchUserInfo: async () => {
        const { code, data } = await AuthApi.getUserInfo()
        if (code === 0) {
          set({ userInfo: data })
        }
      },
      fetchMenuTree: async () => {
        const { code, data } = await MenuApi.getMenuTree()
        if (code === 0) {
          set({ menuTree: data })
        }
      },
      userLogin: async (loginParams: Record<string, any>) => {
        try {
          await get().fetchLogin(loginParams)
          await get().fetchUserInfo()
          await get().fetchMenuTree()
          return get().loginAfter
        } catch (error) {
          clearCache()
          throw error
        }
      }, // 登录 + 获取用户信息
      userLogout: async () => {
        try {
          const { code } = await AuthApi.logout()
          if (code === 0) {
            clearCache()
            return true
          }
        } catch (error) {
          throw error
        }
      } // 退出登录
    }),
    {
      name: 'user-store',
      partialize: (state) => ({
        userInfo: state.userInfo,
        loginAfter: state.loginAfter,
        menuTree: state.menuTree
      }),
      storage: createJSONStorage(() => window.sessionStorage)
    }
  )
)
