import {
  EditableProTable,
  ProColumns,
  ProForm,
  ProFormDependency,
  ProFormRadio
} from '@ant-design/pro-components'
import { Button, Form } from 'antd'
import { useState } from 'react'
import { tooltips, rules, Enum } from '../config'
import { shareDataItem } from '../types'
import TableUpload from '../components/TableUpload'
import { uuid } from '@/utils/common'
import { normalizeText } from '../utils/index'

interface ShareDataProps {
  uploadOnlyId?: string
  setUploadCount?: any
}
const ShareData: React.FC<ShareDataProps> = ({
  uploadOnlyId,
  setUploadCount
}) => {
  const formIns = Form.useFormInstance()
  const [shareEditableKeys, setShareEditableKeys] = useState<any[]>([])
  // 共有数据信息列表
  const shareDataColumns: ProColumns<shareDataItem>[] = [
    {
      title: '共有主体名称',
      dataIndex: 'sharedInstitutionName',
      formItemProps: { rules: rules.sharedData.sharedInstitutionName },
      fieldProps: {
        normalize: normalizeText,
        maxLength: 300,
        showCount: true
      }
    },
    {
      title: '统一社会信用代码',
      dataIndex: 'sharedInstitutionCode',
      formItemProps: { rules: rules.sharedData.sharedInstitutionCode },
      fieldProps: {
        normalize: normalizeText,
        maxLength: 20,
        showCount: true
      }
    },
    {
      title: '共有主体性质',
      dataIndex: 'sharedInstitutionType',
      valueType: 'select',
      fieldProps: {
        options: Enum.sharedInstitutionTypeEnum
      },
      formItemProps: { rules: rules.sharedData.sharedInstitutionType }
    },
    {
      title: '共有组织机构注册地址',
      dataIndex: 'sharedInstitutionAddress',
      formItemProps: { rules: rules.sharedData.sharedInstitutionAddress },
      fieldProps: {
        normalize: normalizeText,
        maxLength: 100,
        showCount: true
      }
    },
    {
      title: '共有主体授权书',
      dataIndex: 'sharedInstitutionAuthorization',
      tooltip: tooltips.sharedInstitutionAuthorization,
      className: 'uploadColumn',
      // 只读态展示文件名，避免直接显示存储路径
      render: (_, row: any) =>
        row?.sharedInstitutionAuthorization?.[0]?.response.split('/').pop() ||
        '-',
      formItemRender: () => (
        <TableUpload
          uploadOnlyId={uploadOnlyId}
          setUploadCount={setUploadCount}
          fieldName='sharedInstitutionAuthorization'
        />
      )
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, row, __, action) => {
        return (
          <>
            <Button
              type='text'
              onClick={() => {
                action?.startEditable?.(row.id)
              }}
              style={{ color: '#1890FF' }}
            >
              编辑
            </Button>
            <Button
              type='text'
              onClick={() => {
                const currentData = formIns?.getFieldValue('sharedDataList')
                if (currentData?.length) {
                  const newData = currentData.filter(
                    (item: shareDataItem) => item.id !== row.id
                  )
                  formIns?.setFieldValue('sharedDataList', newData)
                }
              }}
              style={{ color: '#FF4D4F' }}
            >
              删除
            </Button>
          </>
        )
      }
    }
  ]
  return (
    <>
      <ProFormRadio.Group
        name='sharedData'
        label='是否共有数据'
        tooltip={tooltips.sharedData}
        options={Enum.whetherEnum}
        rules={rules.sharedData.sharedData}
      />
      <ProFormDependency name={['sharedData']}>
        {({ sharedData }) =>
          sharedData === '1' ? (
            <ProForm.Item
              name='sharedDataList'
              label='共有数据信息'
              rules={rules.sharedData.sharedDataList}
            >
              <EditableProTable<shareDataItem>
                rowKey='id'
                columns={shareDataColumns}
                scroll={{ x: 1200 }}
                toolBarRender={false}
                className='editableProTable'
                recordCreatorProps={{
                  position: 'bottom',
                  newRecordType: 'dataSource',
                  record: () => ({
                    id: uuid()
                  }),
                  creatorButtonText: '添加一行数据'
                }}
                editable={{
                  type: 'multiple',
                  editableKeys: shareEditableKeys,
                  onChange: setShareEditableKeys
                }}
              />
            </ProForm.Item>
          ) : null
        }
      </ProFormDependency>
    </>
  )
}
export default ShareData
