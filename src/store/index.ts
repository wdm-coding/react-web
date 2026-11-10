import { create } from 'zustand'
import { userSlice } from './modules/user'
import { globalSlice } from './modules/global'
export const useBoundStore = create((...a) => ({
  ...userSlice(...a),
  ...globalSlice(...a),
}))