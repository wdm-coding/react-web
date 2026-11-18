import {
  ProFormDependency,
  ProFormRadio,
  ProFormUploadButton
} from '@ant-design/pro-components'
import { rules, Enum, uploadTransform } from '../config'
import useCustomUpload from '@/hooks/useCustomUpload'
interface DirecDataProps {
  uploadOnlyId?: string
  setUploadCount?: any
}
const DirecData: React.FC<DirecDataProps> = ({
  uploadOnlyId,
  setUploadCount
}) => {
  return (
    <>
      <ProFormRadio.Group
        name='basedDataDirectory'
        label='是否基于已有成果填报数据目录'
        rules={rules.direcData.basedDataDirectory}
        options={Enum.basedDataDirectoryEnum}
        initialValue='1'
      />
      <ProFormDependency name={['basedDataDirectory']}>
        {({ basedDataDirectory }) => (
          <>
            <ProFormUploadButton
              title='上传'
              label='上传数据字段项'
              name='demandFile'
              max={1}
              rules={rules.direcData.demandFile}
              transform={uploadTransform}
              extra={
                <div style={{ paddingTop: 10 }}>
                  支持上传xlsx格式的文件，文件大小不能超过20M，最多支持1个
                  <a style={{ marginLeft: 16 }}>数据字段项.xlsx</a>
                </div>
              }
              fieldProps={{
                ...useCustomUpload({
                  maxSizeMB: 20,
                  accept: ['.xlsx'],
                  setUploadCount,
                  extraParams: {
                    dataRegistCode: uploadOnlyId,
                    field: 'demandFile'
                  }
                })
              }}
            />
            <ProFormUploadButton
              title='上传'
              label='样例数据'
              name='sampleData'
              max={1}
              rules={rules.direcData.sampleData}
              transform={uploadTransform}
              extra={
                <div style={{ paddingTop: 10 }}>
                  支持上传xlsx格式的文件，文件大小不能超过50M,最多支持1个
                  <a style={{ marginLeft: 16 }}>样例数据.xlsx</a>
                </div>
              }
              fieldProps={{
                ...useCustomUpload({
                  maxSizeMB: 50,
                  accept: ['.xlsx'],
                  setUploadCount,
                  extraParams: {
                    dataRegistCode: uploadOnlyId,
                    field: 'sampleData'
                  }
                })
              }}
            />
          </>
        )}
      </ProFormDependency>
    </>
  )
}
export default DirecData
