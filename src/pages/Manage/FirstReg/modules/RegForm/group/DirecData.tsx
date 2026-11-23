import {
  ProFormDependency,
  ProFormRadio,
  ProFormUploadButton
} from '@ant-design/pro-components'
import { rules, Enum, downloadFile } from '../config'
import useCustomUpload from '@/hooks/useCustomUpload'
import { Button } from 'antd'
interface DirecDataProps {
  uploadOnlyId?: string
  setUploadCount?: any
  templateFiles?: any
}
const DirecData: React.FC<DirecDataProps> = ({
  uploadOnlyId,
  setUploadCount,
  templateFiles = null
}) => {
  return (
    <>
      <ProFormRadio.Group
        name='basedDataDirectory'
        label='是否基于已有成果填报数据目录'
        rules={rules.direcData.basedDataDirectory}
        options={Enum.basedDataDirectoryEnum}
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
              extra={
                <div style={{ paddingTop: 10 }}>
                  支持上传xlsx格式的文件，文件大小不能超过20M，最多支持1个
                  {basedDataDirectory === '1' &&
                    templateFiles?.demandFile2017 && (
                      <Button
                        type='link'
                        onClick={() =>
                          downloadFile(templateFiles?.demandFile2017?.value)
                        }
                        style={{ marginLeft: 16 }}
                      >
                        {templateFiles?.demandFile2017?.fileName || ''}
                      </Button>
                    )}
                  {basedDataDirectory === '2' &&
                    templateFiles?.demandFile2022 && (
                      <Button
                        type='link'
                        onClick={() =>
                          downloadFile(templateFiles?.demandFile2022?.value)
                        }
                        style={{ marginLeft: 16 }}
                      >
                        {templateFiles?.demandFile2022?.fileName || ''}
                      </Button>
                    )}
                  {basedDataDirectory === '3' && templateFiles?.demandFile && (
                    <Button
                      type='link'
                      onClick={() =>
                        downloadFile(templateFiles?.demandFile?.value)
                      }
                      style={{ marginLeft: 16 }}
                    >
                      {templateFiles?.demandFile?.fileName || ''}
                    </Button>
                  )}
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
              extra={
                <div style={{ paddingTop: 10 }}>
                  支持上传xlsx格式的文件，文件大小不能超过50M,最多支持1个
                  {templateFiles?.sampleData && (
                    <Button
                      type='link'
                      onClick={() =>
                        downloadFile(templateFiles?.sampleData?.value)
                      }
                      style={{ marginLeft: 16 }}
                    >
                      {templateFiles?.sampleData?.fileName || ''}
                    </Button>
                  )}
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
