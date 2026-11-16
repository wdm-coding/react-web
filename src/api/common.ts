import { Post,Get, type RequestFn } from '@/services/http.decorator'

class CommonApi {
  // 获取区域树
  @Post('common/area')
  static getAreaTree: RequestFn<any, any>

  // 获取大数据机构areaPath
  @Get('common/getOrgByArea')
  static getOrgByArea: RequestFn<any, any>

  // 获取行业树
  @Post('common/industry')
  static getIndustryTree: RequestFn<any, any>
}
export default CommonApi
