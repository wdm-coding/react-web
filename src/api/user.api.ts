import { Get, type RequestFn } from '@/services/http.decorator'

class UserApi {
  @Get('/user/list')
  static getUserList: RequestFn<any, any>

  // 获取用户信息
  @Get('/user/info')
  static getUserInfo: RequestFn<any, any>
}

export default UserApi
