import useCustomUpload from '@/hooks/useCustomUpload'
import { Button, Upload, UploadFile, UploadProps } from 'antd'
import { useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import { uploadTransform } from '../config'
interface TableUploadProps {
  uploadOnlyId?: string
  setUploadCount?: any
  fieldName?: string
  value?: any
  onChange?: any
}
const TableUpload: React.FC<TableUploadProps> = ({
  uploadOnlyId,
  setUploadCount,
  fieldName,
  value,
  onChange
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const onInnerChange: UploadProps['onChange'] = (info: any) => {
    setFileList(info.fileList)
    onChange?.(uploadTransform(info.fileList))
  }
  return (
    <Upload
      {...useCustomUpload({
        maxCount: 1,
        setUploadCount,
        extraParams: {
          dataRegistCode: uploadOnlyId,
          field: fieldName
        }
      })}
      onChange={onInnerChange}
      fileList={fileList}
    >
      <Button icon={<UploadOutlined />}>上传</Button>
    </Upload>
  )
}

export default TableUpload
