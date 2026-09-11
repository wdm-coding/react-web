import { Post } from '@/services/http.decorator'

class CommonApi {
  @Post('/common/upload')
  static async uploadFile(_params?: Record<string, any>): Promise<any> {
    return undefined as any
  }
}
export default CommonApi
