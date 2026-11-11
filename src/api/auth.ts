import { Post, Get, type RequestFn } from '@/services/http.decorator'

class AuthApi {
  // 获取注册跳转地址
  @Get('/auth/register')
  static getRegister: RequestFn<any, any>

  // 获取加密公钥
  @Post('/auth/secret')
  static getSecret: RequestFn<any, any>
  
  // 账号密码登录
  @Post('/auth/login')
  static Login: RequestFn<any, any>

  // 获取图片验证码
  @Post('/auth/captcha')
  static getCaptcha: RequestFn<any, any>

  // 获取第三方登录跳转地址
  @Post('/auth/alreadyLogin')
  static getThirdLoginUrl: RequestFn<any, any>

  // 退出登录
  @Post('/auth/logout')
  static Logout: RequestFn<any, any>
}

export default AuthApi
