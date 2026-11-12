import { Post, type RequestFn } from '@/services/http.decorator'

class UserApi {
  // 获取主体信息
  @Post('user/getInstitutionList')
  static getInsList: RequestFn<any, any>
}

export default UserApi
