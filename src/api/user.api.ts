import { Get } from '@/services/http.decorator'

class UserApi {
  @Get('/user/list')
  static async getUserList(_params?: Record<string, any>): Promise<any> {
    return undefined as any
  }

  // 获取用户信息
  @Get('/user/info')
  static async getUserInfo(): Promise<any> {
    return undefined as any
  }
}

export default UserApi
