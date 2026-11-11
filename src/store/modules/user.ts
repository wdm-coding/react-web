import type { StateCreator } from 'zustand'
import type { UserSlice } from '../types'
import UserApi from '@/api/user'



const createUserSlice: StateCreator<
  UserSlice,
  [['zustand/persist', unknown], ['zustand/immer', never]],
  [],
  UserSlice
> = (set,get) => ({
  isLoggedIn: false,
  userInfo: null,
  fetchCurrentUser: async () => {
    const res = await UserApi.getCurrentUser({})
    if (res.code === 20000) {
      set((state) => {state.userInfo = res.data})
    }
  },
  userLogin: async () => {
    try {
      await get().fetchCurrentUser()
    } catch (error) {
      console.log(error)
    }
  }
})

export default createUserSlice