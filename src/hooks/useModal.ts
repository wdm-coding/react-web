import { useShallow } from 'zustand/react/shallow'
import { useBoundStore } from '@/store'
import type { UserSlice, GlobalSlice, BoundState } from '@/store/types'

/** 切片名 → 切片状态类型映射 */
export interface SliceMap {
  user: Partial<UserSlice>
  global: GlobalSlice
}

/**
 * 新增切片时：store/modules 下新增模块文件（自动扫描），并在此补充 SliceMap 类型与选择器
 */
const sliceSelectors: {
  [K in keyof SliceMap]: (state: BoundState) => SliceMap[K]
} = {
  user: ({ isLoggedIn, userInfo, userLogin, fetchCaptcha, captchaId,useLogout }) => ({
    isLoggedIn,
    userInfo,
    userLogin,
    fetchCaptcha,
    captchaId,
    useLogout
  }),
  global: ({ siteName, env, storage, setItem, getItem, removeItem, clearStorage }) => ({
    siteName,
    env,
    storage,
    setItem,
    getItem,
    removeItem,
    clearStorage
  })
}

const useModal = <T extends keyof SliceMap>(name: T): SliceMap[T] => {
  return useBoundStore(useShallow(sliceSelectors[name]))
}

export default useModal
