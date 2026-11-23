import { Post, type RequestFn } from '@/services/http.decorator'
import httpService from '@/services/index'

export interface PortalResponse<T> {
  code: number
  data: T
  msg?: string
}

export interface CaptchaResult {
  captchaId: string
  /** 验证码图片 base64（不含 data:image 前缀） */
  captcha: string
}

export interface DataInspectionResult {
  /** 'true' 查询成功，'false' 未查到登记确认单 */
  result: 'true' | 'false'
  inspectionTime: string
  regNumber?: string
  dataRegistName?: string
  institutionName?: string
}

export interface FileUploadResult {
  /** 文件存储路径，用于登记结果查验 */
  resultUrl: string
}

class RegCheckApi {
  /** 获取图形验证码 */
  @Post('auth/captcha')
  static getCaptcha: RequestFn<undefined, PortalResponse<CaptchaResult>>

  /** 获取文件上传目录标识 */
  @Post('file/onlyId')
  static getFileOnlyId: RequestFn<undefined, PortalResponse<string>>

  /** 上传 ofd 文件 */
  static uploadFile(dataRegistCode: string, field: string, file: File) {
    const formData = new FormData()
    formData.append('file', file)
    return httpService({
      url: `file/upload?dataRegistCode=${encodeURIComponent(dataRegistCode)}&field=${encodeURIComponent(field)}`,
      method: 'post',
      data: formData
    }) as Promise<PortalResponse<FileUploadResult>>
  }

  /** 登记结果查验（手工录入与文件上传共用） */
  static dataInspection(formData: FormData, captchaId: string) {
    return httpService({
      url: 'unifiedPortal/dataInspection',
      method: 'post',
      data: formData,
      headers: { captchaId }
    }) as Promise<PortalResponse<DataInspectionResult>>
  }
}

export default RegCheckApi
