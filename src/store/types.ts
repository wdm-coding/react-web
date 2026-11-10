// 全局状态类型
export interface GlobalSlice {
  /** 侧边菜单是否收起 */
  collapsed: boolean
  /** 切换侧边菜单收起状态 */
  toggleCollapsed: () => void
}

// 用户状态类型
export interface UserSlice {
  /** 当前登录用户信息 */
  userInfo: Record<string, any> | null
  /** 设置用户信息 */
  setUserInfo: (userInfo: UserSlice['userInfo']) => void
  /** 清除用户信息 */
  clearUserInfo: () => void
}
export type BoundState = UserSlice & GlobalSlice