import useCustomUpload from '@/hooks/useCustomUpload'
import { Button, Upload, UploadFile, UploadProps } from 'antd'
import { useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'
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
  onChange,
  value
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>(value || [])
  const onInnerChange: UploadProps['onChange'] = (info: any) => {
    setFileList(info.fileList)
    const done = info.fileList.filter((f) => f.status === 'done')
    onChange?.(
      done?.map((f) => ({
        name: f?.name,
        url: f?.response,
        status: f.status,
        uid: f.uid,
        response: f?.response
      }))
    )
  }
  return (
    <div style={{ marginTop: -5 }}>
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
        {fileList?.length > 0 ? null : (
          <Button icon={<UploadOutlined />}>上传</Button>
        )}
      </Upload>
    </div>
  )
}

export default TableUpload
