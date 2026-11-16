import { Get, type RequestFn } from '@/services/http.decorator'
class MenuApi {
  @Get('/menu/tree')
  static getMenuTree: RequestFn<any, any>
}
export default MenuApi
