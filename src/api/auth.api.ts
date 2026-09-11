import { Post, Get } from '@/services/http.decorator'

class AuthApi {
  @Post('/auth/login')
  static async userLogin(_params?: Record<string, any>): Promise<any> {
    return undefined as any
  }

  @Post('/auth/refresh')
  static async tokenRefresh(): Promise<any> {
    return undefined as any
  }

  @Get('/auth/userInfo')
  static async getUserInfo(): Promise<any> {
    return undefined as any
  }

  @Get('/auth/logout')
  static async logout(): Promise<any> {
    return undefined as any
  }
}

export default AuthApi
