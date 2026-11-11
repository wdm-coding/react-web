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
  userLogin: (params:any) => Promise<any> // 用户登录
  fetchCaptcha: () => Promise<any> // 获取图片验证码
  captchaId: string // 图片验证码id
  fetchSecret: () => Promise<any> // 获取加密公钥
  randomId: string // 加密随机数id
 }
export type BoundState = UserSlice & GlobalSlice