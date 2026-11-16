import { Upload } from 'antd'

interface Props {
  onChange?: (file: any) => void
  url?: string
  accept?: string[]
  maxSize?: number
}
const useUploadConfig = ({
  onChange,
  url = 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  accept = [],
  maxSize = 2 // 2MB
}: Props) => {
  const beforeUpload = (file: any) => {
    // 校验文件后缀是否正确
    const suffix = '.' + file.name.split('.').pop()
    if (accept.length && !accept.includes(suffix)) {
      window.$message.error(`${suffix}格式不支持`)
      return Upload.LIST_IGNORE
    }
    // 校验文件大小是否超过最大限制
    if (file.size > maxSize * 1024 * 1024) {
      window.$message.error(`文件大小不能超过${maxSize}MB`)
      return Upload.LIST_IGNORE
    }
    return true
  }
  const customRequest = async ({ file, onSuccess, onError }: any) => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch(url, { method: 'POST', body: formData })
      const data = await res.json()
      onChange?.(data.avatar)
      onSuccess?.(data)
    } catch (err) {
      onError?.(err)
    }
  }
  return {
    beforeUpload,
    customRequest
  }
}

export default useUploadConfig
