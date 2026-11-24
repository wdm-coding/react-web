import { Post, type RequestFn } from '@/services/http.decorator'
import { ProofItem, ProofListQuery } from '@/api/types/certManage'
import { Response, PageListResult } from '@/api/types/common'

class CertManageApi {
  // 获取确认单列表
  @Post('proof/list')
  static getProofList: RequestFn<
    ProofListQuery,
    Response<PageListResult<ProofItem>>
  >
}
export default CertManageApi
