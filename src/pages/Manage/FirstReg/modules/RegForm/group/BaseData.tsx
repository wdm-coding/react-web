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
import { rules, Enum, tooltips, dateRangeFormat, downloadFile } from '../config'
import { useContext, useEffect, useState } from 'react'
import CommonApi from '@/api/common'
import { Button, Flex, Form } from 'antd'
import useIndusTree from '../utils/useIndusTree'
import useCustomUpload from '@/hooks/useCustomUpload'
import { authOperatItem } from '../types'
import { uuid } from '@/utils/common'
import { FormContext } from '../index.tsx'
import { normalizeText } from '../utils/index'
interface BaseDataProps {
  uploadOnlyId?: string
  setUploadCount?: any
  templateFiles?: any
}
const BaseData: React.FC<BaseDataProps> = ({
  uploadOnlyId,
  setUploadCount,
  templateFiles = null
}) => {
  const { detail, setExtraParams } = useContext(FormContext)
  const formIns = Form.useFormInstance()
  const {
    industryTreeData,
    createTreeData,
    industryName,
    industryList,
    getLastLevelIndustryIds
  } = useIndusTree()
  const [authOperatEditableKeys, setAuthOperatEditableKeys] = useState<any[]>(
    []
  )
  // 被授权登记数据列表
  const authOperatColumns: ProColumns<authOperatItem>[] = [
    {
      title: '被授权登记数据名称',
      dataIndex: 'dataRegistName2',
      tooltip: tooltips.dataRegistName2,
      formItemProps: {
        rules: rules.baseData.dataRegistName2
      },
      fieldProps: {
        normalize: normalizeText,
        showSearch: true,
        maxLength: 150
      }
    },
    {
      title: '被授权数据登记编码',
      dataIndex: 'dataRegistCode2',
      tooltip: tooltips.dataRegistCode2,
      formItemProps: { rules: rules.baseData.dataRegistCode2 },
      fieldProps: {
        normalize: normalizeText,
        showSearch: true,
        maxLength: 64
      }
    },
    {
      title: '被授权运营时间',
      tooltip: tooltips.authOperatTimeRange,
      dataIndex: 'authOperatTimeRange',
      valueType: 'dateRange',
      formItemProps: {
        rules: rules.baseData.authOperatTimeRange,
        normalize: dateRangeFormat
      },
      render: (_, row: authOperatItem) =>
        row.authOperatTimeRange?.length
          ? row.authOperatTimeRange.join('至')
          : ''
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

  // 授权运营情况改变时
  const authOperationStatusChange = (value: string) => {
    if (value === '1') {
      formIns?.setFieldsValue({
        authOperatEntityName: '丝绸之路信息港股份有限公司',
        authOperatEntityCode: '91620100MA73UAR56E',
        authOperatTimeRange: ['2026-11-17', '2028-04-16']
      })
      return
    }
    formIns?.setFieldsValue({
      authOperatEntityName: '',
      authOperatEntityCode: '',
      authOperatTimeRange: []
    })
  }

  // 行业分类改变时
  const industryChange = (value: any[]) => {
    if (value.length > 0) {
      createTreeData(value)
    } else {
      createTreeData(null)
    }
  }

  // 覆盖地区改变时
  const coverageAreaChange = async (value: any[], selectedOptions: any[]) => {
    const pathName = selectedOptions.map((item) => item.name).join('')
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
  // 行业分类改变时
  useEffect(() => {
    setExtraParams({ industryList })
  }, [industryList])
  useEffect(() => {
    if (detail?.industryList?.length) {
      const ids = getLastLevelIndustryIds(detail?.industryList)
      createTreeData(ids)
    }
  }, [detail])
  return (
    <>
      <ProFormCascader
        name='coverageArea'
        label='资源覆盖地区'
        rules={rules.baseData?.coverageArea}
        tooltip={tooltips.coverageArea}
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
        tooltip={tooltips.industry}
        label='行业分类'
        name='industry'
        placeholder='请选择行业分类'
        allowClear
        secondary
        rules={rules.baseData.industry}
        fieldProps={{
          onChange: industryChange,
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
        label='登记数据名称'
        tooltip={tooltips.dataRegistName}
        name='dataRegistName'
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
                  rules={rules.baseData.dataRegistName}
                  normalize={normalizeText}
                  fieldProps={{
                    maxLength,
                    showCount: true
                  }}
                />
              </Flex>
            )
          }}
        </ProFormDependency>
      </ProForm.Item>
      <ProFormRadio.Group
        tooltip={tooltips.dataRegistType}
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
                tooltip={tooltips.dataCoverageTimeRange}
                name='dataCoverageTimeRange'
                label='数据覆盖时间'
                rules={rules.baseData.dataCoverageTimeRange}
                normalize={dateRangeFormat}
              />
              <ProFormRadio.Group
                tooltip={tooltips.authOperationStatus}
                name='authOperationStatus'
                label='授权运营情况'
                options={Enum.authOperationStatusEnum}
                rules={rules.baseData.authOperationStatus}
                fieldProps={{
                  multiple: true,
                  onChange: (e) => authOperationStatusChange(e.target.value)
                }}
              />
              {authOperationStatus === '1' ? (
                <>
                  <ProFormText
                    tooltip={tooltips.authOperatEntityName}
                    name='authOperatEntityName'
                    label='运营机构名称'
                    rules={rules.baseData.authOperatEntityName}
                    normalize={normalizeText}
                    fieldProps={{
                      maxLength: 50,
                      showCount: true
                    }}
                  />
                  <ProFormText
                    tooltip={tooltips.authOperatEntityCode}
                    name='authOperatEntityCode'
                    label='运营机构代码'
                    normalize={normalizeText}
                    rules={rules.baseData.authOperatEntityCode}
                    fieldProps={{
                      maxLength: 20,
                      showCount: true
                    }}
                  />
                  <ProFormDateRangePicker
                    tooltip={tooltips.authOperatTimeRange}
                    name='authOperatTimeRange'
                    label='授权运营时间'
                    rules={rules.baseData.authOperatTimeRange}
                    normalize={dateRangeFormat}
                  />
                </>
              ) : null}
            </>
          ) : (
            <>
              <ProFormRadio.Group
                tooltip={tooltips.dataProductAndServicesType}
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
                  normalize={normalizeText}
                  fieldProps={{
                    maxLength: 100,
                    showCount: true
                  }}
                />
              ) : null}
              <ProFormRadio.Group
                tooltip={tooltips.authResourceDevelop}
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
                    rowKey='id'
                    columns={authOperatColumns}
                    scroll={{ x: 480 }}
                    toolBarRender={false}
                    className='editableProTable'
                    recordCreatorProps={{
                      position: 'bottom',
                      newRecordType: 'dataSource',
                      record: () => ({
                        id: uuid()
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
                max={1}
                rules={rules.baseData.productAndServiceDetails}
                extra={
                  <div style={{ paddingTop: 10 }}>
                    支持上传jpg、png、pdf、jpeg格式，文件大小不能超过5M，支持上传1个文件
                    {templateFiles?.productAndServiceDetails?.value && (
                      <Button
                        onClick={() =>
                          downloadFile(
                            templateFiles?.productAndServiceDetails?.value
                          )
                        }
                        type='link'
                        style={{ marginLeft: 16 }}
                      >
                        {templateFiles?.productAndServiceDetails?.fileName ||
                          ''}
                      </Button>
                    )}
                  </div>
                }
                fieldProps={{
                  ...useCustomUpload({
                    accept: ['.jpg', '.png', '.pdf', '.jpeg'],
                    maxSizeMB: 5,
                    setUploadCount,
                    extraParams: {
                      dataRegistCode: uploadOnlyId,
                      field: 'productAndServiceDetails'
                    }
                  })
                }}
              />
              <ProFormRadio.Group
                tooltip={tooltips.productUsage}
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
        tooltip={tooltips.infoSecurityAssessReport}
        title='上传'
        max={5}
        label='数据安全风险评估报告'
        name='infoSecurityAssessReport'
        rules={rules.baseData.infoSecurityAssessReport}
        extra={
          <div style={{ paddingTop: 10 }}>
            支持上传jpg、png、pdf、jpeg格式，每个文件大小不能超过20M，最多支持5个
            {templateFiles?.infoSecurityAssessReport?.value && (
              <Button
                onClick={() =>
                  downloadFile(templateFiles?.infoSecurityAssessReport?.value)
                }
                type='link'
                style={{ marginLeft: 16 }}
              >
                {templateFiles?.infoSecurityAssessReport?.fileName || ''}
              </Button>
            )}
          </div>
        }
        fieldProps={{
          ...useCustomUpload({
            accept: ['.jpg', '.png', '.pdf', '.jpeg'],
            maxCount: 5,
            maxSizeMB: 20,
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
        tooltip={tooltips.dataContentIntroduction}
        name='dataContentIntroduction'
        label='数据内容简介'
        normalize={normalizeText}
        rules={rules.baseData.dataContentIntroduction}
        fieldProps={{
          maxLength: 100,
          showCount: true
        }}
        extra={
          <div style={{ paddingTop: 10 }}>
            数据内容简介不能超过100个字符，不能包含特殊字符
          </div>
        }
      />
      <ProFormText
        tooltip={tooltips.dataLabel}
        name='dataLabel'
        label='数据标签'
        normalize={normalizeText}
        rules={rules.baseData.dataLabel}
        fieldProps={{
          maxLength: 60,
          showCount: true
        }}
        extra={
          <div style={{ paddingTop: 10 }}>
            数据内容简介不能超过100个字符，不能包含特殊字符数据内容简介不能超过100个字符，不能包含特殊字符数据内容简介不能超过100个字符，不能包含特殊字符数据内容简介不能超过100个字符，不能包含特殊字符
          </div>
        }
      />
    </>
  )
}
export default BaseData
