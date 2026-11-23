// 全局状态类型
import type { ReactNode } from 'react'

export interface GlobalSlice {
  siteName: string // 站点名称
  env: 'test' | 'prod' | 'dev' // 环境 测试/生产/开发
  loginType: 'local' | 'third' // 登录类型 本地/第三方登录
  authModal: {
    isOpen: boolean // 是否打开登录弹窗
    content: ReactNode // 自定义提示内容，为空时使用默认文案
    open: (content?: ReactNode) => void // 打开登录弹窗，可传入自定义提示内容
    close: () => void // 关闭登录弹窗
  }
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
  fetchMenusPermissions: (params: any) => Promise<any> // 获取菜单权限
  userLogin: (params: any) => Promise<any> // 用户登录
  fetchCaptcha: () => Promise<any> // 获取图片验证码
  captchaId: string // 图片验证码id
  fetchSecret: () => Promise<any> // 获取加密公钥
  randomId: string // 加密随机数id
  useLogout: () => Promise<string> // 退出登录
  checkLogin: () => Promise<void> // 检查是否已登录
  clearCache: () => void // 清除登录缓存
}

// 系统配置状态类型
export interface SystemSlice {
  doorTitle: string // 门户标题
  platformTitle: string // 平台标题
  fetchSystemConfig: () => Promise<void> // 获取系统配置
}
export type BoundState = UserSlice & GlobalSlice & SystemSlice
