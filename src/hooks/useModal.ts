import { useShallow } from 'zustand/react/shallow'
import { useBoundStore } from '@/store'
import type {
  UserSlice,
  GlobalSlice,
  SystemSlice,
  BoundState
} from '@/store/types'

/** 切片名 → 切片状态类型映射 */
export interface SliceMap {
  user: Partial<UserSlice>
  global: GlobalSlice
  system: SystemSlice
}

/**
 * 新增切片时：store/modules 下新增模块文件（自动扫描），并在此补充 SliceMap 类型与选择器
 */
const sliceSelectors: {
  [K in keyof SliceMap]: (state: BoundState) => SliceMap[K]
} = {
  user: ({
    isLoggedIn,
    userInfo,
    userLogin,
    fetchCaptcha,
    captchaId,
    checkLogin,
    useLogout
  }) => ({
    isLoggedIn,
    userInfo,
    userLogin,
    fetchCaptcha,
    captchaId,
    checkLogin,
    useLogout
  }),
  global: ({
    siteName,
    env,
    storage,
    authModal,
    setItem,
    getItem,
    removeItem,
    clearStorage,
    loginType
  }) => ({
    siteName,
    env,
    loginType,
    storage,
    authModal,
    setItem,
    getItem,
    removeItem,
    clearStorage
  }),
  system: ({ doorTitle, platformTitle, fetchSystemConfig }) => ({
    doorTitle,
    platformTitle,
    fetchSystemConfig
  })
}

const useModal = <T extends keyof SliceMap>(name: T): SliceMap[T] => {
  return useBoundStore(useShallow(sliceSelectors[name]))
}

export default useModal
