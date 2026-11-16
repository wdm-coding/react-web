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
import { useState } from 'react'
import CommonApi from '@/api/common'
import { Form } from 'antd'
import {useRequest} from '@/hooks/useRequest'
import { transformTree } from '../utils'

const BaseData = () => {
  const formIns = Form.useFormInstance()
  const [dataRegistOrgName, setDataRegistOrgName] = useState('')
  const [authOperatEditableKeys, setAuthOperatEditableKeys] = useState<any[]>(
    []
  )
  type authOperatItem = {
    id: any
    dataRegistName2: string
    dataRegistCode2: string
    authOperatTimeRange: string[]
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
      dataIndex: 'authOperatTimeRange',
      formItemProps: { rules: rules.baseData.authOperatTimeRange }
    },
    { title: '操作', valueType: 'option' }
  ]
  useRequest(CommonApi.getIndustryTree,{
    onSuccess: ({code,data}) => {
      if(code === 20000){
        setAllIndustry(transformTree(data || []))
        setIndustryTree(transformTree(data || []))
      }
    }
  })
  const [allIndustry, setAllIndustry] = useState<any[]>([])
  const [industryTree, setIndustryTree] = useState<any[]>([])
  const onIndustryChange = (value: any[]) => {
    console.log(value)
  }
  return (
    <>
      <ProFormCascader
        name='regionCoverArea'
        label='资源覆盖地区'
        rules={rules.baseData.regionCoverArea}
        fieldProps={{
          fieldNames: {
            label: 'name',
            value: 'code',
            children: 'children'
          },
          changeOnSelect: true,
          onChange: async (value) => {
            const { code, data } = await CommonApi.getOrgByArea({
              areaPath: value.join(',')
            })
            if (code === 20000) {
              setDataRegistOrgName(data?.organizationName || '')
              formIns?.setFieldValue(
                'dataRegistOrgName',
                data?.organizationName || ''
              )
            }
          }
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
      <ProForm.Item name='dataRegistOrgName' label='登记机构'>
        {dataRegistOrgName}
      </ProForm.Item>
      <ProFormTreeSelect
        label='行业分类'
        name='industry'
        placeholder='请选择行业分类'
        allowClear
        secondary
        fieldProps={{
          treeData: industryTree,
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
          },
          onChange: (value) => {
            onIndustryChange(value)
          }
        }}
      />
      <ProFormText
        name='name'
        label='数据资源名称'
        rules={rules.baseData.name}
        fieldProps={{
          maxLength: 148,
          showCount: true
        }}
      />
      <ProFormRadio.Group
        name='dataRegisteType'
        label='登记数据类型'
        options={Enum.regDataTypeEnum}
      />
      <ProFormDependency
        name={[
          'dataRegisteType',
          'authOperatType',
          'authResourcDevelop',
          'dataProductAndServicesType'
        ]}
      >
        {({
          dataRegisteType,
          authOperatType,
          authResourcDevelop,
          dataProductAndServicesType
        }) =>
          dataRegisteType === '1' ? (
            <>
              <ProFormDateRangePicker name='dateRange' label='数据覆盖时间' />
              <ProFormRadio.Group
                name='authOperatType'
                label='授权运营情况'
                options={Enum.authOperatTypeEnum}
              />
              {authOperatType === '1' ? (
                <>
                  <ProFormText
                    name='name'
                    label='运营机构名称'
                    rules={rules.baseData.name}
                    fieldProps={{
                      maxLength: 50,
                      showCount: true
                    }}
                  />
                  <ProFormText
                    name='name'
                    label='运营机构代码'
                    rules={rules.baseData.name}
                    fieldProps={{
                      maxLength: 20,
                      showCount: true
                    }}
                  />
                  <ProFormText
                    name='name'
                    label='授权运营时间'
                    rules={rules.baseData.name}
                  />
                </>
              ) : null}
            </>
          ) : (
            <>
              <ProFormRadio.Group
                name='dataProductAndServicesType'
                label='数据产品和服务类型'
                options={Enum.dataProductAndServiceTypeEnum}
              />
              {dataProductAndServicesType === '11' ? (
                <ProFormText
                  name='dataProductAndServicesOtherType'
                  label='其他数据产品和服务类型'
                  fieldProps={{
                    maxLength: 100,
                    showCount: true
                  }}
                />
              ) : null}
              <ProFormRadio.Group
                name='authResourcDevelop'
                label='是否基于被授权资源开发'
                options={Enum.whetherEnum}
              />
              {authResourcDevelop === '1' ? (
                <ProForm.Item
                  name='authOperatList'
                  label='授权操作列表'
                  fieldProps={{
                    maxLength: 100,
                    showCount: true
                  }}
                >
                  <EditableProTable<authOperatItem>
                    name='tasks'
                    rowKey='id'
                    columns={authOperatColumns}
                    scroll={{ x: 480 }}
                    toolBarRender={false}
                    recordCreatorProps={false}
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
                name='productAndServiceDetail'
                action='upload.do'
              />
              <ProFormRadio.Group
                name='productUse'
                label='产品用途'
                options={Enum.productUseEnum}
              />
            </>
          )
        }
      </ProFormDependency>
      <ProFormUploadButton
        title='上传'
        label='数据安全风险评估报告'
        name='dataSecurityRiskAssessmentReport'
        action='upload.do'
      />
      <ProFormRadio.Group
        name='dataType'
        label='数据分类'
        options={Enum.dataTypeEnum}
      />
      <ProFormTextArea
        name='name'
        label='数据内容简介'
        rules={rules.baseData.name}
        fieldProps={{
          maxLength: 100,
          showCount: true
        }}
      />
      <ProFormText
        name='name'
        label='数据标签'
        rules={rules.baseData.name}
        fieldProps={{
          maxLength: 60,
          showCount: true
        }}
      />
    </>
  )
}
export default BaseData
