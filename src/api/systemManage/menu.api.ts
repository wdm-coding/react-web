import { Get } from '@/services/http.decorator';
class MenuApi {
  @Get('/menu/tree')
  static async getMenuTree(_params?: Record<string, any>): Promise<any> {}
}
export default MenuApi;
