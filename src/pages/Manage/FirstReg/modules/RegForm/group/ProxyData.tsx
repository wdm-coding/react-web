import {
  ProFormDateRangePicker,
  ProFormDependency,
  ProFormRadio,
  ProFormText,
  ProFormUploadButton
} from '@ant-design/pro-components'
import { Enum, uploadTransform, tooltips, rules } from '../config'
import useCustomUpload from '@/hooks/useCustomUpload'

interface ProxyDataProps {
  uploadOnlyId?: string
  setUploadCount?: any
}
const ProxyData: React.FC<ProxyDataProps> = ({
  uploadOnlyId,
  setUploadCount
}) => {
  return (
    <>
      <ProFormRadio.Group
        name='isProxyRegist'
        label='是否委托代理登记'
        tooltip={tooltips.isProxyRegist}
        initialValue='1'
        rules={rules.proxyData.isProxyRegist}
        options={Enum.whetherEnum}
      />
      <ProFormDependency name={['isProxyRegist']}>
        {({ isProxyRegist }) =>
          isProxyRegist === '1' ? (
            <>
              <ProFormText
                name='proxyEntityName'
                label='委托登记主体名称'
                tooltip={tooltips.proxyEntityName}
                rules={rules.proxyData.proxyEntityName}
                fieldProps={{
                  maxLength: 150,
                  showCount: true,
                  placeholder: '请输入委托登记主体名称'
                }}
              />
              <ProFormText
                name='proxyEntityCode'
                label='委托登记主体代码'
                tooltip={tooltips.proxyEntityCode}
                rules={rules.proxyData.proxyEntityCode}
                fieldProps={{
                  maxLength: 64,
                  showCount: true,
                  placeholder: '请输入'
                }}
              />
              <ProFormDateRangePicker
                name='proxyTimeRange'
                label='委托代理时间'
                tooltip={tooltips.proxyTimeRange}
                rules={rules.proxyData.proxyTimeRange}
              />
              <ProFormUploadButton
                title='上传'
                label='委托代理协议书'
                name='proxyAgreement'
                max={1}
                tooltip={tooltips.proxyAgreement}
                rules={rules.proxyData.proxyAgreement}
                transform={uploadTransform}
                extra={
                  <div>
                    支持上传jpg、png、pdf、jpeg格式的文件，每个文件大小不能超过20M，最多支持1个
                    <a style={{ marginLeft: 16 }}>登记代理委托书.docx</a>
                  </div>
                }
                fieldProps={{
                  ...useCustomUpload({
                    maxCount: 1,
                    maxSizeMB: 20,
                    accept: ['.jpg', '.png', '.pdf', '.jpeg'],
                    setUploadCount,
                    extraParams: {
                      dataRegistCode: uploadOnlyId,
                      field: 'proxyAgreement'
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
