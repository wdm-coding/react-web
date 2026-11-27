import { ProFormUploadButton } from '@ant-design/pro-components'
import { rules, tooltips } from '../config'
import { downloadFile } from '../utils/index'
import useCustomUpload from '@/hooks/useCustomUpload'
import { Button } from 'antd'
interface DataSourceProps {
  uploadOnlyId?: string
  setUploadCount?: any
  templateFiles?: any
}
const DataSource: React.FC<DataSourceProps> = ({
  uploadOnlyId,
  setUploadCount,
  templateFiles = null
}) => {
  return (
    <>
      <ProFormUploadButton
        title='上传'
        label='数据合规性来源及承诺'
        name='dataSourceCommitment'
        max={1}
        tooltip={tooltips.dataSourceCommitment}
        rules={rules.dataSource.dataSourceCommitment}
        extra={
          <div style={{ paddingTop: 10 }}>
            支持上传jpg、png、pdf、jpeg格式的文件，每个文件大小不能超过20M，最多支持1个
            {templateFiles?.dataSourceCommitment?.value && (
              <Button
                type='link'
                onClick={() =>
                  downloadFile(templateFiles?.dataSourceCommitment?.value)
                }
                style={{ marginLeft: 16 }}
              >
                {templateFiles?.dataSourceCommitment?.fileName}
              </Button>
            )}
            <p style={{ color: 'red' }}>
              温馨提醒：为确保信息安全与合规，请严格避免上传任何涉密文件。一旦发生违规上传，相关责任将由您自行承担，请务必谨慎操作。
            </p>
          </div>
        }
        fieldProps={{
          ...useCustomUpload({
            maxSizeMB: 20,
            accept: ['.jpg', '.png', '.pdf', '.jpeg'],
            setUploadCount,
            extraParams: {
              dataRegistCode: uploadOnlyId,
              field: 'dataSourceCommitment'
            }
          })
        }}
      />
    </>
  )
}
export default DataSource
