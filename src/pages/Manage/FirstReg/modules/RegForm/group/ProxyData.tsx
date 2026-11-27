import {
  ProFormDateRangePicker,
  ProFormDependency,
  ProFormRadio,
  ProFormText,
  ProFormUploadButton
} from '@ant-design/pro-components'
import { Enum, tooltips, rules } from '../config'
import { downloadFile, dateRangeFormat } from '../utils/index'
import useCustomUpload from '@/hooks/useCustomUpload'
import { Button } from 'antd'
import { normalizeText } from '../utils/index'

interface ProxyDataProps {
  uploadOnlyId?: string
  setUploadCount?: any
  templateFiles?: any
}
const ProxyData: React.FC<ProxyDataProps> = ({
  uploadOnlyId,
  setUploadCount,
  templateFiles = null
}) => {
  return (
    <>
      <ProFormRadio.Group
        name='entrustedAgent'
        label='是否委托代理登记'
        tooltip={tooltips.entrustedAgent}
        rules={rules.proxyData.entrustedAgent}
        options={Enum.whetherEnum}
      />
      <ProFormDependency name={['entrustedAgent']}>
        {({ entrustedAgent }) =>
          entrustedAgent === '1' ? (
            <>
              <ProFormText
                name='entrustedAgentName'
                label='委托登记主体名称'
                normalize={normalizeText}
                tooltip={tooltips.entrustedAgentName}
                rules={rules.proxyData.entrustedAgentName}
                fieldProps={{
                  maxLength: 150,
                  showCount: true
                }}
              />
              <ProFormText
                name='entrustedAgentCode'
                label='委托登记主体代码'
                normalize={normalizeText}
                tooltip={tooltips.entrustedAgentCode}
                rules={rules.proxyData.entrustedAgentCode}
                fieldProps={{
                  maxLength: 64,
                  showCount: true
                }}
              />
              <ProFormDateRangePicker
                name='entrustedAgentTime'
                label='委托代理时间'
                tooltip={tooltips.entrustedAgentTime}
                rules={rules.proxyData.entrustedAgentTime}
                normalize={dateRangeFormat}
              />
              <ProFormUploadButton
                title='上传'
                label='委托代理协议书'
                name='entrustedAgentAgree'
                max={1}
                tooltip={tooltips.entrustedAgentAgree}
                rules={rules.proxyData.entrustedAgentAgree}
                extra={
                  <div style={{ paddingTop: 10 }}>
                    支持上传jpg、png、pdf、jpeg格式的文件，每个文件大小不能超过20M，最多支持1个
                    {templateFiles?.entrustedAgentAgree?.value && (
                      <Button
                        onClick={() =>
                          downloadFile(
                            templateFiles?.entrustedAgentAgree?.value
                          )
                        }
                        type='link'
                        style={{ marginLeft: 16 }}
                      >
                        {templateFiles?.entrustedAgentAgree?.fileName || ''}
                      </Button>
                    )}
                  </div>
                }
                fieldProps={{
                  ...useCustomUpload({
                    maxSizeMB: 20,
                    accept: ['.jpg', '.png', '.pdf', '.jpeg'],
                    setUploadCount,
                    extraParams: {
                      dataRegistCode: uploadOnlyId,
                      field: 'entrustedAgentAgree'
                    }
                  })
                }}
              />
            </>
          ) : null
        }
      </ProFormDependency>
    </>
  )
}
export default ProxyData
