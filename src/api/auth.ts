import { Post, Get, type RequestFn } from '@/services/http.decorator'

class AuthApi {
  // 获取注册跳转地址
  @Get('/auth/register')
  static getRegister: RequestFn<any, any>

  // 获取加密公钥
  @Post('/auth/secret')
  static getSecret: RequestFn<any, any>
  
  // 账号密码登录 第三方登录传authCode,账号密码登录传username,password
  @Post('/auth/login')
  static Login: RequestFn<any, any>

  // 获取图片验证码
  @Post('/auth/captcha')
  static getCaptcha: RequestFn<any, any>

  // 获取第三方登录跳转地址   未登录时返回第三方跳转链接，已登录时返回是否已登录标识
  @Post('/auth/alreadyLogin')
  static getThirdLoginUrl: RequestFn<any, any>

  // 检查是否已登录
  @Post('/auth/alreadyLogin')
  static checkLogin: RequestFn<any, any>

  // 获取账号信息
  @Post('/auth/currentUser')
  static getCurrentUser: RequestFn<any, any>

  // 退出登录
  @Post('/auth/logout')
  static Logout: RequestFn<any, any>
}

export default AuthApi
