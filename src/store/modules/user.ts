import type { StateCreator } from 'zustand'
import type { UserSlice } from '../types'
import AuthApi from '@/api/auth'
import UserApi from '@/api/user'
import Encrypt from '@/utils/encrypt'



const createUserSlice: StateCreator<
  UserSlice,
  [['zustand/persist', unknown], ['zustand/immer', never]],
  [],
  UserSlice
> = (set,get) => ({
  isLoggedIn: false,
  userInfo: null,
  captchaId: '',
  randomId: '',
  fetchCurrentUser: async () => {
    const res = await AuthApi.getCurrentUser({})
    if (res.code === 20000) {
      const insRes = await UserApi.getInsList()
      if (insRes.code === 20000) {
        const currentIns = res.personage ? (insRes.data || []).find(v=>v.setDefault === 1) : insRes.data?.[0]
        set((state) => {state.userInfo = {
          ...res.data,
          insList: insRes.data || [],
          currentIns,
          userName:res.personage ? res.userName : currentIns.institutionName
        }})
      }
    }
  },
  fetchCaptcha: async () => {
    const {code,data} = await AuthApi.getCaptcha()
    if (code === 20000) {
      set((state) => {state.captchaId = data?.captchaId || ''})
      return data?.captcha || ''
    }
  },
  fetchSecret: async () => {
    const {code,data} = await AuthApi.getSecret()
    if (code === 20000) {
      set((state) => {state.randomId = data?.randomId + data?.random || ''})
      return {
        random: data?.random || '',
        publicKey: data?.publicKey || '',
      }
    }
  },
  userLogin: async (params:any) => {
    const { authCode,tokenCookie } = params
    try {
      if (tokenCookie) {
        await get().fetchCurrentUser()
        return new Promise((resolve) => {
          set((state) => {state.isLoggedIn = true})
          resolve('/portal')
        })
      }
      const {random,publicKey} = await get().fetchSecret()
      const password = Encrypt({random,publicKey},params.password)
      await AuthApi.Login(authCode ? { authCode } : {...params,password})
      await get().fetchCurrentUser()
      set((state) => {state.isLoggedIn = true})
      return new Promise((resolve) => {
        resolve('/portal')
      })
    } catch (error) {
      set((state) => {state.isLoggedIn = false})
      set((state) => {state.userInfo = null})
      throw error
    }
  },
  useLogout:async ()=>{
    const res = await AuthApi.Logout()
    if (res.code === 20000) {
      get().clearCache()
      return new Promise((resolve) => {
        resolve(true)
      })
    }
  },
  clearCache: () => {
    set((state) => {
      state.isLoggedIn = false
      state.userInfo = null
      state.captchaId = ''
      state.randomId = ''
    })
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
    document.cookie = 'hasToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
  }
})

export default createUserSlice