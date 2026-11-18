import {
  EditableProTable,
  ProColumns,
  ProForm,
  ProFormCascader,
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
import {
  industryChange,
  authOperationStatusChange,
  uploadTransform
} from '../config'
import useCustomUpload from '@/hooks/useCustomUpload'

interface BaseDataProps {
  uploadOnlyId?: string
  setUploadCount?: any
}
const BaseData: React.FC<BaseDataProps> = ({
  uploadOnlyId,
  setUploadCount
}) => {
  const formIns = Form.useFormInstance()
  const { industryTreeData, createTreeData, industryName } = useIndusTree()
  const [authOperatEditableKeys, setAuthOperatEditableKeys] = useState<any[]>(
    []
  )
  type authOperatItem = {
    id: any
    dataRegistName2?: string
    dataRegistCode2?: string
    authOperatTimeRange2?: string[]
  }
  const authOperatColumns: ProColumns<authOperatItem>[] = [
    {
      title: '被授权登记数据名称',
      dataIndex: 'dataRegistName2',
      formItemProps: { rules: rules.baseData.dataRegistName2 }
    },
    {
      title: '被授权数据登记编码',
      dataIndex: 'dataRegistCode2',
      formItemProps: { rules: rules.baseData.dataRegistCode2 }
    },
    {
      title: '被授权运营时间',
      dataIndex: 'authOperatTimeRange2',
      valueType: 'dateRange',
      formItemProps: { rules: rules.baseData.authOperatTimeRange2 }
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
                const currentData = formIns?.getFieldValue('authOperatList')
                if (currentData?.length) {
                  const newData = currentData.filter(
                    (item) => item.id !== row.id
                  )
                  formIns?.setFieldValue('authOperatList', newData)
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
  // 初始化授权运营情况
  useEffect(() => {
    authOperationStatusChange(
      formIns,
      formIns?.getFieldValue('authOperationStatus')
    )
  }, [])
  // 覆盖地区改变时
  const coverageAreaChange = async (value: any[], selectedOptions: any[]) => {
    const pathName = selectedOptions.map((item) => item.name).join('-')
    formIns?.setFieldValue('coverageAreaName', pathName || '')
    const { code, data } = await CommonApi.getOrgByArea({
      areaPath: value.join(',')
    })
    if (code === 20000) {
      formIns?.setFieldValue('orgArea', data?.organizationName || '')
    }
  }
  // 行业分类改变时
  useEffect(() => {
    formIns?.setFieldValue('industryName', industryName || '')
  }, [industryName])
  return (
    <>
      <ProFormCascader
        name='coverageArea'
        label='资源覆盖地区'
        rules={rules.baseData?.coverageArea}
        fieldProps={{
          fieldNames: {
            label: 'name',
            value: 'code',
            children: 'children'
          },
          changeOnSelect: true,
          onChange: (value, selectedOptions) =>
            coverageAreaChange(value, selectedOptions)
        }}
        request={async () => {
          const { code, data } = await CommonApi.getAreaTree()
          if (code === 20000) {
            return data || []
          } else {
            return []
          }
        }}
      />
      <ProFormText
        label='登记机构'
        name='orgArea'
        className='readOnlyFormItem'
        fieldProps={{ readOnly: true, disabled: true }}
      />
      <ProFormTreeSelect
        label='行业分类'
        name='industry'
        placeholder='请选择行业分类'
        allowClear
        secondary
        rules={rules.baseData.industry}
        fieldProps={{
          onChange: (value) => {
            industryChange(value, createTreeData)
          },
          popupClassName: 'industryTreeSelectPopup',
          treeData: industryTreeData,
          filterTreeNode: true,
          showSearch: true,
          popupMatchSelectWidth: false,
          labelInValue: true,
          autoClearSearchValue: true,
          multiple: true,
          treeNodeFilterProp: 'title',
          fieldNames: {
            label: 'name',
            value: 'industryId',
            children: 'children'
          }
        }}
      />
      <ProForm.Item
        label='数据资源名称'
        name='dataRegistName'
        rules={rules.baseData.dataRegistName}
      >
        <ProFormDependency name={['industryName', 'coverageAreaName']}>
          {({ industryName, coverageAreaName }) => {
            const usedLength =
              (industryName?.length || 0) + (coverageAreaName?.length || 0)
            const maxLength = 148 - usedLength
            return (
              <Flex gap={12} style={{ width: '100%' }}>
                <ProFormText
                  name='industryName'
                  className='readOnlyFormItem'
                  style={{ marginBottom: 0 }}
                  fieldProps={{ readOnly: true, disabled: true }}
                />
                <div style={{ paddingTop: 5 }}>-</div>
                <ProFormText
                  className='readOnlyFormItem'
                  name='coverageAreaName'
                  style={{ marginBottom: 0 }}
                  fieldProps={{ readOnly: true, disabled: true }}
                />
                <div style={{ paddingTop: 5 }}>-</div>
                <ProFormText
                  name='dataRegistName'
                  style={{ minWidth: 0, flex: 1, marginBottom: 0 }}
                  fieldProps={{ maxLength, showCount: true }}
                />
              </Flex>
            )
          }}
        </ProFormDependency>
      </ProForm.Item>
      <ProFormRadio.Group
        name='dataRegistType'
        label='登记数据类型'
        rules={rules.baseData.dataRegistType}
        options={Enum.dataRegistTypeEnum}
      />
      <ProFormDependency
        name={[
          'dataRegistType',
          'authOperationStatus',
          'authResourceDevelop',
          'dataProductAndServicesType'
        ]}
      >
        {({
          dataRegistType,
          authOperationStatus,
          authResourceDevelop,
          dataProductAndServicesType
        }) =>
          dataRegistType === '1' ? (
            <>
              <ProFormDateRangePicker
                name='dataCoverageTimeRange'
                label='数据覆盖时间'
                rules={rules.baseData.dataCoverageTimeRange}
              />
              <ProFormRadio.Group
                name='authOperationStatus'
                label='授权运营情况'
                options={Enum.authOperationStatusEnum}
                rules={rules.baseData.authOperationStatus}
                fieldProps={{
                  onChange: (e) =>
                    authOperationStatusChange(formIns, e.target.value)
                }}
              />
              {authOperationStatus === '1' ? (
                <>
                  <ProFormText
                    name='authOperatEntityName'
                    label='运营机构名称'
                    rules={rules.baseData.authOperatEntityName}
                    fieldProps={{
                      maxLength: 50,
                      showCount: true
                    }}
                  />
                  <ProFormText
                    name='authOperatEntityCode'
                    label='运营机构代码'
                    rules={rules.baseData.authOperatEntityCode}
                    fieldProps={{
                      maxLength: 20,
                      showCount: true
                    }}
                  />
                  <ProFormText
                    name='authOperatTimeRange'
                    label='授权运营时间'
                    rules={rules.baseData.authOperatTimeRange}
                  />
                </>
              ) : null}
            </>
          ) : (
            <>
              <ProFormRadio.Group
                name='dataProductAndServicesType'
                label='公共数据产品和服务类型'
                options={Enum.dataProductAndServicesTypeEnum}
                rules={rules.baseData.dataProductAndServicesType}
              />
              {dataProductAndServicesType === '11' ? (
                <ProFormText
                  name='dataProductsAndServicesOtherType'
                  label='其他数据产品或服务类型'
                  rules={rules.baseData.dataProductsAndServicesOtherType}
                  fieldProps={{
                    maxLength: 100,
                    showCount: true
                  }}
                />
              ) : null}
              <ProFormRadio.Group
                name='authResourceDevelop'
                label='是否基于被授权资源开发'
                options={Enum.whetherEnum}
                rules={rules.baseData.authResourceDevelop}
              />
              {authResourceDevelop === '1' ? (
                <ProForm.Item
                  name='authOperatList'
                  label='被授权资源信息'
                  rules={rules.baseData.authOperatList}
                >
                  <EditableProTable<authOperatItem>
                    name='authOperatList'
                    rowKey='id'
                    columns={authOperatColumns}
                    scroll={{ x: 480 }}
                    toolBarRender={false}
                    recordCreatorProps={{
                      position: 'bottom',
                      newRecordType: 'dataSource',
                      record: () => ({
                        id: new Date().getTime() + Math.random()
                      }),
                      creatorButtonText: '新增一行'
                    }}
                    editable={{
                      type: 'multiple',
                      editableKeys: authOperatEditableKeys,
                      onChange: setAuthOperatEditableKeys
                    }}
                  />
                </ProForm.Item>
              ) : null}
              {/* 产品和服务详情 */}
              <ProFormUploadButton
                title='上传'
                label='产品和服务详情'
                name='productAndServiceDetails'
                max={2}
                rules={rules.baseData.productAndServiceDetails}
                transform={uploadTransform}
                fieldProps={{
                  ...useCustomUpload({
                    maxCount: 2,
                    setUploadCount,
                    extraParams: {
                      dataRegistCode: uploadOnlyId,
                      field: 'productAndServiceDetails'
                    }
                  })
                }}
              />
              <ProFormRadio.Group
                name='productUsage'
                label='产品用途'
                options={Enum.productUsageEnum}
                rules={rules.baseData.productUsage}
              />
            </>
          )
        }
      </ProFormDependency>
      <ProFormUploadButton
        title='上传'
        max={2}
        label='数据安全风险评估报告'
        name='infoSecurityAssessReport'
        rules={rules.baseData.infoSecurityAssessReport}
        transform={uploadTransform}
        fieldProps={{
          ...useCustomUpload({
            maxCount: 2,
            setUploadCount,
            extraParams: {
              dataRegistCode: uploadOnlyId,
              field: 'infoSecurityAssessReport'
            }
          })
        }}
      />
      <ProFormRadio.Group
        name='dataType'
        label='数据分类'
        options={Enum.dataTypeEnum}
        rules={rules.baseData.dataType}
      />
      <ProFormTextArea
        name='dataContentIntroduction'
        label='数据内容简介'
        rules={rules.baseData.dataContentIntroduction}
        fieldProps={{
          maxLength: 100,
          showCount: true
        }}
      />
      <ProFormText
        name='dataLabel'
        label='数据标签'
        rules={rules.baseData.dataLabel}
        fieldProps={{
          maxLength: 60,
          showCount: true
        }}
      />
    </>
  )
}
export default BaseData
