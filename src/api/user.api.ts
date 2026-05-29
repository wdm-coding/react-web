import { Post, Get } from '@/services/http.decorator';

class UserApi {
  @Get('/user/list')
  static async userList(_params?: Record<string, any>): Promise<any> {}
  // 获取用户信息
  @Get('/user/info')
  static async userInfo(): Promise<any> {}
}

export default UserApi;
