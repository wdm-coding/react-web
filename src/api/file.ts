import { Post, type RequestFn } from '@/services/http.decorator'

class FileApi {
  // 获取上传文件onlyId
  @Post('file/onlyId')
  static getFileUploadOnlyId: RequestFn<any, any>

  // 上传文件
  @Post('file/upload', { contentType: 'multipart/form-data' })
  static uploadFile: RequestFn<any, any>

  // 获取系统配置模版文件
  @Post('systemConfig/page')
  static getTemplateFiles: RequestFn<any, any>

  // 下载文件
  @Post('/file/download')
  static downloadFile: RequestFn<any, any>
}
export default FileApi
