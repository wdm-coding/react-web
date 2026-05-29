import { Post, Get } from '@/services/http.decorator';

class AuthApi {
  @Post('/auth/login')
  static async userLogin(_params?: Record<string, any>): Promise<any> {}

  @Post('/auth/refresh')
  static async tokenRefresh(): Promise<any> {}

  @Get('/auth/userInfo')
  static async getUserInfo(): Promise<any> {}

  @Get('/auth/logout')
  static async logout(): Promise<any> {}
}

export default AuthApi;
