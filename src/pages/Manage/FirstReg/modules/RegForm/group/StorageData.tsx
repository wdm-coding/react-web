import {
  ProForm,
  ProFormDependency,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton
} from '@ant-design/pro-components'
import { Button, Checkbox, Col, Flex, Row } from 'antd'
import { rules, Enum, tooltips, downloadFile } from '../config'
import useCustomUpload from '@/hooks/useCustomUpload'
import styles from '../index.module.scss'

interface StorageDataProps {
  uploadOnlyId?: string
  setUploadCount?: any
  templateFiles?: any
}
const StorageData: React.FC<StorageDataProps> = ({
  uploadOnlyId,
  setUploadCount,
  templateFiles = null
}) => {
  return (
    <>
      <ProForm.Item
        name='productionMethod'
        label='数据产生方式'
        tooltip={tooltips.productionMethod}
        rules={rules.storageData.productionMethod}
      >
        <Checkbox.Group
          style={{ width: '680px' }}
          className={styles.productionMethodCheckboxGroup}
        >
          <Row gutter={[16, 16]}>
            {Enum.productionMethodEnum.map((item) => (
              <Col key={item.value} xs={24} md={12}>
                <Checkbox
                  value={item.value}
                  className={styles.productionMethodCheckbox}
                >
                  <div style={{ fontWeight: 600 }}>{item.label}</div>
                  <div style={{ marginTop: 8, color: 'rgba(0,0,0,0.45)' }}>
                    {item.desc}
                  </div>
                </Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      </ProForm.Item>
      <ProFormDependency
        name={[
          'productionMethod',
          'dataStructure',
          'dataProvisionFormat',
          'storageMethod'
        ]}
      >
        {({
          productionMethod,
          dataStructure,
          dataProvisionFormat,
          storageMethod
        }) => (
          <>
            {productionMethod?.includes('6') ? (
              <ProFormText
                name='productionOtherMethod'
                label='其他数据产生方式说明'
                tooltip={tooltips.productionOtherMethod}
                rules={rules.storageData.productionOtherMethod}
                fieldProps={{
                  maxLength: 100,
                  showCount: true
                }}
              />
            ) : null}
            <ProFormRadio.Group
              tooltip={tooltips.dataStructure}
              name='dataStructure'
              label='数据结构'
              rules={rules.storageData.dataStructure}
              options={Enum.dataStructureEnum}
            />
            {dataStructure === '4' ? (
              <ProFormText
                name='dataOtherStructure'
                label='其他数据结构'
                tooltip={tooltips.dataOtherStructure}
                rules={rules.storageData.dataOtherStructure}
                fieldProps={{
                  maxLength: 100,
                  showCount: true
                }}
              />
            ) : null}
            <ProFormSelect
              name='dataProvisionFormat'
              label='数据提供格式'
              tooltip={tooltips.dataProvisionFormat}
              rules={rules.storageData.dataProvisionFormat}
              options={Enum.dataProvisionFormatEnum}
              placeholder='请选择数据提供格式'
            />
            {dataProvisionFormat === '5' ? (
              <ProFormText
                name='dataProvisionOtherFormat'
                label='其他数据提供格式'
                tooltip={tooltips.dataProvisionOtherFormat}
                rules={rules.storageData.dataProvisionOtherFormat}
                fieldProps={{
                  maxLength: 100,
                  showCount: true
                }}
              />
            ) : null}
            <ProFormSelect
              name='storageMethod'
              label='数据存储方式'
              tooltip={tooltips.storageMethod}
              rules={rules.storageData.storageMethod}
              options={Enum.storageMethodEnum}
              placeholder='请选择数据存储方式'
            />
            {storageMethod === '7' ? (
              <ProFormText
                name='storageOtherMethod'
                label='其他数据存储方式'
                tooltip={tooltips.storageOtherMethod}
                rules={rules.storageData.storageOtherMethod}
                fieldProps={{
                  maxLength: 100,
                  showCount: true
                }}
              />
            ) : null}
          </>
        )}
      </ProFormDependency>
      <ProFormText
        label='数据存储量(初始)'
        name='dataStorage'
        rules={rules.storageData.dataStorage}
        fieldProps={{
          maxLength: 10,
          showCount: true,
          placeholder: '请输入数据存储量(初始)',
          addonAfter: (
            <ProFormSelect
              name='dataStorageUnit'
              options={Enum.dataStorageUnitEnum}
              placeholder='请选择单位'
            />
          )
        }}
      />
      <ProFormSelect
        name='updateFrequency'
        label='更新频率'
        rules={rules.storageData.updateFrequency}
        options={Enum.updateFrequencyEnum}
        placeholder='请选择更新频率'
      />
      <ProFormDependency name={['updateFrequency']}>
        {({ updateFrequency }) =>
          updateFrequency === '11' ? (
            <ProFormText
              name='updateOtherFrequency'
              label='其他更新频率'
              tooltip={tooltips.updateOtherFrequency}
              rules={rules.storageData.updateOtherFrequency}
              fieldProps={{
                maxLength: 100,
                showCount: true
              }}
            />
          ) : null
        }
      </ProFormDependency>
      <ProFormSelect
        name='updateMethod'
        label='更新方式'
        tooltip={tooltips.updateMethod}
        rules={rules.storageData.updateMethod}
        options={Enum.updateMethodEnum}
        placeholder='请选择更新方式'
      />
      <ProFormText
        label='数据存储量(增长)'
        name='dataStorageIncrease'
        tooltip={tooltips.dataStorageIncrease}
        rules={rules.storageData.dataStorageIncrease}
        fieldProps={{
          maxLength: 10,
          showCount: true,
          addonAfter: (
            <ProFormSelect
              name='dataStorageIncreaseUnit'
              options={Enum.dataStorageUnitEnum}
              placeholder='请选择单位'
            />
          )
        }}
      />
      <ProFormRadio.Group
        name='sensitiveInformation'
        label='是否包含敏感信息'
        tooltip={tooltips.sensitiveInformation}
        rules={rules.storageData.sensitiveInformation}
        options={Enum.whetherEnum}
      />
      <ProFormDependency
        name={[
          'sensitiveInformation',
          'desensitizationSituation',
          'desensitizationMethod'
        ]}
      >
        {({
          sensitiveInformation,
          desensitizationSituation,
          desensitizationMethod
        }) =>
          sensitiveInformation === '1' ? (
            <>
              <ProFormSelect
                name='sensitiveInvolvingSubject'
                label='涉及主体'
                tooltip={tooltips.sensitiveInvolvingSubject}
                rules={rules.storageData.sensitiveInvolvingSubject}
                options={Enum.sensitiveInvolvingSubjectEnum}
              />
              <ProFormText
                name='sensitiveDataCoverageNumber'
                label='数据覆盖数量'
                tooltip={tooltips.sensitiveDataCoverageNumber}
                rules={rules.storageData.sensitiveDataCoverageNumber}
                fieldProps={{
                  maxLength: 100,
                  showCount: true
                }}
              />
              <ProFormRadio.Group
                name='desensitizationSituation'
                label='是否脱敏'
                tooltip={tooltips.desensitizationSituation}
                rules={rules.storageData.desensitizationSituation}
                options={Enum.whetherEnum}
              />
              {desensitizationSituation === '1' ? (
                <ProFormSelect
                  name='desensitizationMethod'
                  label='脱敏方式'
                  tooltip={tooltips.desensitizationMethod}
                  rules={rules.storageData.desensitizationMethod}
                  options={Enum.desensitizationMethodEnum}
                  placeholder='请选择脱敏方式'
                />
              ) : null}
              {desensitizationMethod === '7' ? (
                <ProFormText
                  name='desensitizationOtherMethod'
                  label='其他脱敏方式'
                  tooltip={tooltips.desensitizationOtherMethod}
                  rules={rules.storageData.desensitizationOtherMethod}
                  fieldProps={{
                    maxLength: 100,
                    showCount: true
                  }}
                />
              ) : null}
            </>
          ) : null
        }
      </ProFormDependency>
      <ProFormRadio.Group
        name='depositMethod'
        label='存证方式'
        tooltip={tooltips.depositMethod}
        rules={rules.storageData.depositMethod}
        options={Enum.depositMethodEnum}
      />
      <ProFormTextArea
        name='certificationDescription'
        label='存证方式说明'
        tooltip={tooltips.depositDescription}
        rules={rules.storageData.depositDescription}
        fieldProps={{
          maxLength: 200,
          showCount: true,
          placeholder: '请输入存证方式说明'
        }}
      />
      <ProFormUploadButton
        title='上传'
        label='存证证明文件'
        name='depositProofDocument'
        max={5}
        tooltip={tooltips.depositProofDocument}
        rules={rules.storageData.depositProofDocument}
        extra={
          <div style={{ paddingTop: 10 }}>
            <span>
              支持上传jpg、png、pdf、jpeg格式，每个文件大小不能超过20M，最多支持5个
            </span>
            {templateFiles?.depositProofDocument?.value && (
              <Button
                onClick={() =>
                  downloadFile(templateFiles?.depositProofDocument?.value)
                }
                type='link'
                style={{ marginLeft: 16 }}
              >
                {templateFiles?.depositProofDocument?.fileName || ''}
              </Button>
            )}
          </div>
        }
        fieldProps={{
          ...useCustomUpload({
            maxCount: 5,
            maxSizeMB: 20,
            accept: ['.jpg', '.png', '.pdf', '.jpeg'],
            setUploadCount,
            extraParams: {
              dataRegistCode: uploadOnlyId,
              field: 'depositProofDocument'
            }
          })
        }}
      />
      <ProFormText
        name='depositDataPath'
        label='存证数据存放路径'
        rules={rules.storageData.depositDataPath}
        fieldProps={{
          maxLength: 200,
          showCount: true,
          placeholder: '请输入存证数据存放路径'
        }}
      />
    </>
  )
}
export default StorageData
