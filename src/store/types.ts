// 全局状态类型
export interface GlobalSlice {
  siteName: string // 站点名称
  env: 'test' | 'prod' | 'dev' // 环境 测试/生产/开发
  storage: Record<string, any> // 本地存储
  setItem: (key: string, value: any) => void // 设置本地存储
  getItem: (key: string) => any // 获取本地存储
  removeItem: (key: string) => void // 删除本地存储
  clearStorage: () => void // 清除本地存储
}

// 用户状态类型
export interface UserSlice {
  isLoggedIn: boolean // 是否登录
  userInfo: Record<string, any> | null // 当前登录用户信息
  fetchCurrentUser: () => Promise<void> // 获取当前用户信息
  userLogin: () => Promise<void> // 用户登录
}
export type BoundState = UserSlice & GlobalSlice