import { Post, type RequestFn } from '@/services/http.decorator'

class UserApi {
  @Post('/auth/currentUser')
  static getCurrentUser: RequestFn<any, any>
}

export default UserApi
