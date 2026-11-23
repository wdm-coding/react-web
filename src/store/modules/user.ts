import type { StateCreator } from 'zustand'
import type { UserSlice } from '../types'
import AuthApi from '@/api/auth'
import UserApi from '@/api/user'
import Encrypt from '@/utils/encrypt'
import { getEnvConfig } from '@/utils/common'

const createUserSlice: StateCreator<
  UserSlice,
  [['zustand/persist', unknown], ['zustand/immer', never]],
  [],
  UserSlice
> = (set, get) => ({
  isLoggedIn: false,
  userInfo: null,
  captchaId: '',
  randomId: '',
  // 获取当前用户信息
  fetchCurrentUser: async () => {
    const res = await AuthApi.getCurrentUser({})
    if (res.code === 20000) {
      const insRes = await UserApi.getInsList()
      if (insRes.code === 20000) {
        const currentIns = res.personage
          ? (insRes.data || []).find((v) => v.setDefault === 1)
          : insRes.data?.[0]
        let menusPermissions = ['CertificateManage', 'Registration']
        if (res?.data?.personage) {
          menusPermissions = await get().fetchMenusPermissions({
            subjectCode: currentIns?.institutionCode || ''
          })
        }
        set((state) => {
          state.userInfo = {
            ...res.data,
            insList: insRes.data || [],
            currentIns,
            userName: res.personage ? res.userName : currentIns.institutionName,
            menuShow: res?.data?.menuShow.concat(menusPermissions || [])
          }
        })
      }
    }
  },
  // 获取验证码
  fetchCaptcha: async () => {
    const { code, data } = await AuthApi.getCaptcha()
    if (code === 20000) {
      set((state) => {
        state.captchaId = data?.captchaId || ''
      })
      return data?.captcha || ''
    }
  },
  // 获取密钥对
  fetchSecret: async () => {
    const { code, data } = await AuthApi.getSecret()
    if (code === 20000) {
      set((state) => {
        state.randomId = data?.randomId + data?.random || ''
      })
      return {
        random: data?.random || '',
        publicKey: data?.publicKey || ''
      }
    }
  },
  // 获取菜单权限
  fetchMenusPermissions: async (params: any) => {
    const { code, data } = await UserApi.getMenusPermissions(params)
    if (code === 20000) {
      return data
    }
  },
  // 用户登录
  userLogin: async (params: any) => {
    const { authCode, tokenCookie } = params
    try {
      if (tokenCookie) {
        await get().fetchCurrentUser()
        set((state) => {
          state.isLoggedIn = true
        })
        return new Promise((resolve) => {
          resolve('/portal')
        })
      }
      const { random, publicKey } = await get().fetchSecret()
      const password = Encrypt({ random, publicKey }, params.password)
      if (authCode) {
        await AuthApi.Login(authCode)
      } else {
        await AuthApi.Login(
          { ...params, password },
          {
            headers: {
              randomid: `${get().randomId}`,
              captchaId: get().captchaId
            }
          }
        )
      }
      await get().fetchCurrentUser()
      set((state) => {
        state.isLoggedIn = true
      })
      return new Promise((resolve) => {
        resolve('/portal')
      })
    } catch (error) {
      set((state) => {
        state.isLoggedIn = false
      })
      set((state) => {
        state.userInfo = null
      })
      throw error
    }
  },
  // 用户退出登录
  useLogout: async () => {
    try {
      const { code, data } = await AuthApi.Logout(
        getEnvConfig().loginType === 'local' ? { redirectUri: '/' } : {}
      )
      if (code === 20000) {
        get().clearCache()
        return Promise.resolve(data?.redirectUrl || '/portal')
      }
    } catch (error) {
      throw error
    }
  },
  // 检查是否已登录 (账号密码登录需要传redirectUrl)
  checkLogin: async () => {
    const redirectUri = new URL(
      window.location.pathname,
      window.location.origin
    ).href
    const { code, data } = await AuthApi.checkLogin(
      getEnvConfig().loginType === 'local' ? { redirectUri } : null
    )
    if (code === 20000) {
      if (data?.login) {
        await get().fetchCurrentUser()
        set((state) => {
          state.isLoggedIn = true
        })
      }
    }
  },
  // 清除登录缓存
  clearCache: () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
    document.cookie = 'hasToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
    set((state) => {
      state.isLoggedIn = false
      state.userInfo = null
      state.captchaId = ''
      state.randomId = ''
    })
  }
})

export default createUserSlice
