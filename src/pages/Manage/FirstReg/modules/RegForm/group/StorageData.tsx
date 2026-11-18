import {
  ProForm,
  ProFormDependency,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton
} from '@ant-design/pro-components'
import { Checkbox, Col, Flex, Row } from 'antd'
import { rules, Enum, tooltips, uploadTransform } from '../config'
import useCustomUpload from '@/hooks/useCustomUpload'
import styles from '../index.module.scss'

interface StorageDataProps {
  uploadOnlyId?: string
  setUploadCount?: any
}
const StorageData: React.FC<StorageDataProps> = ({
  uploadOnlyId,
  setUploadCount
}) => {
  // 存证证明文件上传配置
  const certUploadProps = useCustomUpload({
    maxCount: 5,
    maxSizeMB: 20,
    accept: ['.jpg', '.png', '.pdf', '.jpeg'],
    setUploadCount,
    extraParams: {
      dataRegistCode: uploadOnlyId,
      field: 'certificationProofFile'
    }
  })
  return (
    <>
      <ProForm.Item
        name='productionMethod'
        label='数据产生方式'
        tooltip={tooltips.productionMethod}
        rules={rules.storageData.productionMethod}
        initialValue={[]}
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
            {productionMethod.includes('6') ? (
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
              initialValue={'1'}
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
      <ProForm.Item
        label='数据存储量(初始)'
        tooltip={tooltips.storageVolumeInitial}
        required
      >
        <Flex gap={8}>
          <ProFormText
            name='storageVolumeInitial'
            rules={rules.storageData.storageVolumeInitial}
            fieldProps={{
              maxLength: 10,
              showCount: true,
              placeholder: '请输入数据存储量(初始)'
            }}
            style={{ flex: 1, marginBottom: 0 }}
          />
          <ProFormSelect
            name='storageVolumeInitialUnit'
            rules={rules.storageData.storageVolumeInitialUnit}
            options={Enum.storageVolumeUnitEnum}
            placeholder='请选择单位'
            style={{ width: 120, marginBottom: 0 }}
          />
        </Flex>
      </ProForm.Item>
      <ProFormSelect
        name='updateFrequency'
        label='更新频率'
        tooltip={tooltips.updateFrequency}
        rules={rules.storageData.updateFrequency}
        options={Enum.updateFrequencyEnum}
        placeholder='请选择更新频率'
      />
      <ProFormSelect
        name='updateMethod'
        label='更新方式'
        tooltip={tooltips.updateMethod}
        rules={rules.storageData.updateMethod}
        options={Enum.updateMethodEnum}
        placeholder='请选择更新方式'
      />
      <ProForm.Item
        label='数据存储量(增长)'
        tooltip={tooltips.storageVolumeIncrement}
        required
      >
        <Flex gap={8}>
          <ProFormText
            name='storageVolumeIncrement'
            rules={rules.storageData.storageVolumeIncrement}
            fieldProps={{
              maxLength: 10,
              showCount: true,
              placeholder: '请输入数据存储量(增长)'
            }}
            style={{ flex: 1, marginBottom: 0 }}
          />
          <ProFormSelect
            name='storageVolumeIncrementUnit'
            rules={rules.storageData.storageVolumeIncrementUnit}
            options={Enum.storageVolumeUnitEnum}
            placeholder='请选择单位'
            style={{ width: 120, marginBottom: 0 }}
          />
        </Flex>
      </ProForm.Item>
      <ProFormRadio.Group
        name='isSensitiveInfo'
        label='是否包含敏感信息'
        tooltip={tooltips.isSensitiveInfo}
        initialValue='1'
        rules={rules.storageData.isSensitiveInfo}
        options={Enum.whetherEnum}
      />
      <ProFormDependency name={['isSensitiveInfo']}>
        {({ isSensitiveInfo }) =>
          isSensitiveInfo === '1' ? (
            <ProFormSelect
              name='relatedSubjects'
              label='涉及主体'
              tooltip={tooltips.relatedSubjects}
              rules={rules.storageData.relatedSubjects}
              options={Enum.relatedSubjectsEnum}
              placeholder='请选择涉及主体'
            />
          ) : null
        }
      </ProFormDependency>
      <ProFormText
        name='dataCoverageCount'
        label='数据覆盖数量'
        tooltip={tooltips.dataCoverageCount}
        rules={rules.storageData.dataCoverageCount}
        fieldProps={{
          maxLength: 100,
          showCount: true,
          placeholder: '请输入数据覆盖数量单位（个）'
        }}
      />
      <ProFormRadio.Group
        name='isDesensitized'
        label='是否脱敏'
        tooltip={tooltips.isDesensitized}
        initialValue='1'
        rules={rules.storageData.isDesensitized}
        options={Enum.whetherEnum}
      />
      <ProFormDependency name={['isDesensitized']}>
        {({ isDesensitized }) =>
          isDesensitized === '1' ? (
            <ProFormSelect
              name='desensitizationMethod'
              label='脱敏方式'
              tooltip={tooltips.desensitizationMethod}
              rules={rules.storageData.desensitizationMethod}
              options={Enum.desensitizationMethodEnum}
              placeholder='请选择脱敏方式'
            />
          ) : null
        }
      </ProFormDependency>
      <ProFormRadio.Group
        name='certificationMethod'
        label='存证方式'
        tooltip={tooltips.certificationMethod}
        initialValue='1'
        rules={rules.storageData.certificationMethod}
        options={Enum.certificationMethodEnum}
      />
      <ProFormTextArea
        name='certificationDescription'
        label='存证方式说明'
        rules={rules.storageData.certificationDescription}
        fieldProps={{
          maxLength: 200,
          showCount: true,
          placeholder: '请输入存证方式说明'
        }}
      />
      <ProFormUploadButton
        title='上传'
        label='存证证明文件'
        name='certificationProofFile'
        max={5}
        rules={rules.storageData.certificationProofFile}
        transform={uploadTransform}
        extra={
          <Flex vertical gap={4}>
            <span>
              支持上传jpg、png、pdf、jpeg格式，每个文件大小不能超过20M，最多支持5个
            </span>
            <a>公共数据资源登记存证指南.pdf</a>
          </Flex>
        }
        fieldProps={certUploadProps}
      />
      <ProFormText
        name='certificationDataPath'
        label='存证数据存放路径'
        rules={rules.storageData.certificationDataPath}
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
