import {
  ProFormCheckbox,
  ProFormDependency,
  ProFormRadio,
  ProFormText,
  ProFormTextArea
} from '@ant-design/pro-components'
import { rules, Enum, tooltips } from '../config'

const OpenData = () => {
  return (
    <>
      <ProFormRadio.Group
        name='sharingType'
        label='共享类型'
        initialValue='1'
        rules={rules.openData.sharingType}
        options={Enum.sharingTypeEnum}
      />
      <ProFormDependency
        name={['sharingType', 'sharingMethod', 'socialOpenness']}
      >
        {({ sharingType, sharingMethod, socialOpenness }) => (
          <>
            {sharingType === '2' ? (
              <ProFormTextArea
                name='sharingConditions'
                label='共享条件'
                tooltip={tooltips.sharingConditions}
                rules={rules.openData.sharingConditions}
                fieldProps={{
                  maxLength: 100,
                  showCount: true,
                  placeholder: '请输入共享条件'
                }}
              />
            ) : null}
            <ProFormCheckbox.Group
              name='sharingMethod'
              label='共享方式'
              tooltip={tooltips.sharingMethod}
              rules={rules.openData.sharingMethod}
              options={Enum.sharingMethodEnum}
              fieldProps={{
                mode: 'multiple'
              }}
              initialValue={['1']}
            />
            {sharingMethod?.includes('5') ? (
              <ProFormText
                name='sharingOtherMethod'
                label='其他共享方式'
                tooltip={tooltips.sharingOtherMethod}
                rules={rules.openData.sharingOtherMethod}
              />
            ) : null}
            <ProFormRadio.Group
              name='socialOpenness'
              label='是否向社会开放'
              initialValue='1'
              rules={rules.openData.socialOpenness}
              options={Enum.whetherEnum}
            />
            {socialOpenness === '1' ? (
              <ProFormText
                name='opennessConditions'
                label='开放条件'
                tooltip={tooltips.opennessConditions}
                rules={rules.openData.opennessConditions}
                fieldProps={{
                  maxLength: 200,
                  showCount: true,
                  placeholder: '请输入开放条件'
                }}
              />
            ) : null}
          </>
        )}
      </ProFormDependency>
    </>
  )
}
export default OpenData
