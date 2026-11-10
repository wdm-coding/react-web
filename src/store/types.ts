// 全局状态类型
export interface GlobalSlice {
  siteName: string // 站点名称
  storage: Record<string, any> // 本地存储
  /** 设置本地存储 */
  setItem: (key: string, value: any) => void
  /** 获取本地存储 */
  getItem: (key: string) => any
  /** 删除本地存储 */
  removeItem: (key: string) => void
  /** 清除本地存储 */
  clearStorage: () => void
}

// 用户状态类型
export interface UserSlice {
  isLoggedIn: boolean // 是否登录
  userInfo: Record<string, any> | null // 当前登录用户信息
  setUserInfo: (userInfo: UserSlice['userInfo']) => void // 设置用户信息
  clearUserInfo: () => void // 清除用户信息
}
export type BoundState = UserSlice & GlobalSlice