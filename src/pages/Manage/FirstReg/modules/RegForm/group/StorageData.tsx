import {
  EditableProTable,
  ProColumns,
  ProForm,
  ProFormCascader,
  ProFormCheckbox,
  ProFormDateRangePicker,
  ProFormDependency,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
  ProFormTreeSelect,
  ProFormUploadButton
} from '@ant-design/pro-components'
import { rules, Enum } from '../config'
import { useEffect, useState } from 'react'
import CommonApi from '@/api/common'
import { Button, Flex, Form } from 'antd'
import useIndusTree from '../utils/useIndusTree'
import { uploadTransform, tooltips } from '../config'
import useCustomUpload from '@/hooks/useCustomUpload'
const StorageData = () => {
  return (
    <>
      <ProFormCheckbox.Group
        name='checkbox'
        label='行业分布'
        options={[
          {
            label: '农业',
            value: '农业'
          },
          {
            label: '制造业',
            value: '制造业'
          },
          {
            label: '互联网',
            value: '互联网'
          }
        ]}
      />
    </>
  )
}
export default StorageData
