import { Post, type RequestFn } from '@/services/http.decorator'

class CommonApi {
  // 获取区域树
  @Post('common/area')
  static getAreaTree: RequestFn<any, any>

  // 获取行业树
  @Post('common/industry')
  static getIndustryTree: RequestFn<any, any>
}
export default CommonApi
