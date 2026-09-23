import { Post, type RequestFn } from '@/services/http.decorator'

class CommonApi {
  @Post('/common/upload')
  static uploadFile: RequestFn<any, any>
}
export default CommonApi
