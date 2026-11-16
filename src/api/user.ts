import { Post, type RequestFn } from '@/services/http.decorator'

class UserApi {
  // 获取主体列表
  @Post('user/getInstitutionList')
  static getInsList: RequestFn<any, any>

  // 获取账号信息
  @Post('accountInfo/getAccountInfo')
  static getAccountInfo: RequestFn<any, any>
}

export default UserApi
