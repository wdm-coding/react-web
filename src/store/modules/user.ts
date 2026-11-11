import type { StateCreator } from 'zustand'
import type { UserSlice } from '../types'
import UserApi from '@/api/user'
import AuthApi from '@/api/auth'
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
    const res = await UserApi.getCurrentUser({})
    if (res.code === 20000) {
      set((state) => {state.userInfo = res.data})
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
    const { authCode } = params
    try {
      const {random,publicKey} = await get().fetchSecret()
      const password = Encrypt({random,publicKey},params.password)
      await AuthApi.Login(authCode ? { authCode } : {...params,password})
      await get().fetchCurrentUser()
      return new Promise((resolve) => {
        set((state) => {state.isLoggedIn = true})
        resolve('/portal')
      })
    } catch (error) {
      set((state) => {state.isLoggedIn = false})
      set((state) => {state.userInfo = null})
      throw error
    }
  }
})

export default createUserSlice