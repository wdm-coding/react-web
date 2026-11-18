import FileApi from '@/api/file'
import { UploadListType, UploadProps } from 'antd/es/upload/interface'
interface Props {
  fieldName?: string
  maxCount?: number
  maxSizeMB?: number
  accept?: string[]
  uploadApi?: any
  listType?: UploadListType
  extraParams?: Record<string, unknown>
  setUploadCount?: any
}
const useCustomUpload = ({
  fieldName = 'file',
  maxCount = 1,
  maxSizeMB = 10,
  accept = [],
  uploadApi = FileApi.uploadFile,
  listType = 'text',
  extraParams = {},
  setUploadCount
}: Props) => {
  const customRequest: UploadProps['customRequest'] = async ({
    file,
    onSuccess,
    onError,
    data
  }) => {
    const formData = new FormData()
    formData.append(fieldName, file as File)
    // 如果 Upload 上配置了 data 额外参数
    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value as string)
      })
    }
    try {
      setUploadCount?.((prev) => prev + 1)
      const { code, data } = await uploadApi(formData)
      if (code === 20000) {
        onSuccess?.(data?.resultUrl)
      }
    } catch (err: any) {
      onError?.(err)
    } finally {
      setUploadCount?.((prev) => prev - 1)
    }
  }
  const beforeUpload = (file: File) => {
    if (maxSizeMB && file.size > maxSizeMB * 1024 * 1024) {
      window.$message.error(`文件大小不能超过${maxSizeMB}MB`)
      return false
    }
    const fileType = file.name.split('.').pop()
    console.log(fileType)
    if (!fileType) {
      window.$message.error(`文件类型不存在`)
      return false
    }
    if (accept.length && !accept.includes('.' + fileType)) {
      window.$message.error(`文件类型必须是${accept.join('、')}`)
      return false
    }
    return true
  }
  return {
    name: fieldName,
    maxCount,
    accept: accept.join(','),
    multiple: maxCount > 1,
    listType,
    data: extraParams,
    beforeUpload,
    customRequest
  }
}

export default useCustomUpload
