import { Post, Get, type RequestFn } from '@/services/http.decorator'

class AuthApi {
  @Post('/auth/login')
  static userLogin: RequestFn<any, any>

  @Post('/auth/refresh')
  static tokenRefresh: RequestFn<any, any>

  @Get('/auth/userInfo')
  static getUserInfo: RequestFn<any, any>

  @Get('/auth/logout')
  static logout: RequestFn<any, any>
}

export default AuthApi
