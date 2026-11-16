import ImgCrop from 'antd-img-crop'
import { Upload, UploadProps } from 'antd'
import { useEffect, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import useUploadConfig from '@/hooks/useUploadConfig'

const ImgCropUpload = ({
  onChange,
  value
}: {
  onChange?: (file: any) => void
  value?: any
}) => {
  const uploadConfig = useUploadConfig({ onChange })
  const [fileList, setFileList] = useState<any[]>([])
  useEffect(() => {
    if (value && typeof value === 'string') {
      setFileList([{ uid: '-1', url: value, name: 'image', status: 'done' }])
    }
  }, [value])

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }
  return (
    <ImgCrop rotationSlider>
      <Upload
        listType='picture-card'
        maxCount={1}
        customRequest={uploadConfig.customRequest}
        fileList={fileList}
        onChange={handleChange}
        beforeUpload={uploadConfig.beforeUpload}
      >
        {fileList.length === 1 ? null : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%'
            }}
          >
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        )}
      </Upload>
    </ImgCrop>
  )
}
export default ImgCropUpload
