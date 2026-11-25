import styles from './index.module.scss'
import { ProForm, ProFormInstance } from '@ant-design/pro-components'
import BaseData from './group/BaseData'
import ProxyData from './group/ProxyData'
import StorageData from './group/StorageData'
import SceneData from './group/SceneData'
import OpenData from './group/OpenData'
import ShareData from './group/ShareData'
import DirecData from './group/DirecData'
import DataSource from './group/DataSource'
import { useEffect, useMemo, useRef, useState, createContext } from 'react'
import FileApi from '@/api/file'
import regApplyApi from '@/api/regApply'
import { useRequest } from '@/hooks/useRequest'
import { Button, Descriptions, Flex, Spin } from 'antd'
import { templateFileExtract, initialValues } from './config'
import { submitTransform, getFullFieldParams } from './utils/index'
import { useNavigate } from 'react-router-dom'
import useModal from '@/hooks/useModal'
import { regApproTypeEnum } from '@/pages/Manage/Enum'
import UpdateReason from './group/UpdateReason'
import UpdateInfo from './group/UpdateInfo'
export const FormContext = createContext(null)
const RegForm = ({
  dataRegistId,
  regApproType
}: {
  dataRegistId: string
  regApproType: string
}) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const { userInfo } = useModal('user')
  const [detail, setDetail] = useState<any>(null)
  const [extraParams, setExtraParams] = useState<any>(null)
  const formRef = useRef<ProFormInstance>(null)
  const { data: uploadOnlyId } = useRequest(FileApi.getFileUploadOnlyId)
  const { data: templateFiles } = useRequest(() =>
    FileApi.getTemplateFiles({ pageSize: 999 })
  )
  const templateFileRecord = useMemo(
    () => templateFileExtract(templateFiles?.content || []),
    [templateFiles]
  )
  const [uploadCount, setUploadCount] = useState<number>(0)
  const groupTitle = (title: string) => {
    return (
      <div key={title} className={styles.groupTitle}>
        <span style={{ paddingLeft: 10 }}>{title}</span>
      </div>
    )
  }
  const dataRegistCode = useMemo(() => {
    return detail?.dataRegistCode || uploadOnlyId || ''
  }, [detail, uploadOnlyId])
  // 提交表单
  const onFinish = async (values: any) => {
    if (uploadCount !== 0) {
      window.$message.warning('请等待文件上传完成')
      return
    }
    const baseParams = {
      ...values,
      registerSubjectId: userInfo?.currentIns?.subjectRegistrationId || '',
      dataRegistCode,
      ...extraParams
    }
    if (dataRegistId) {
      baseParams.dataRegistId = dataRegistId
    }
    const afterValues = await submitTransform(baseParams, false)
    console.log('onFinish', afterValues)
    const { code, data } =
      await regApplyApi.submitOrSaveRegApplyDraft(afterValues)
    if (code === 20000 && data) {
      navigate('/manage/regApply/regApplyList')
      window.$message.success('登记申请提交成功')
    }
  }
  // 保存草稿
  const onSaveDraft = async () => {
    const values = formRef.current?.getFieldsValue()
    if (!values?.coverageArea) {
      window.$message.error('请选择覆盖区域')
      return
    }
    if (!values?.industry) {
      window.$message.error('请选择行业')
      return
    }
    if (!values?.dataRegistName) {
      window.$message.error('请输入数据登记名称')
      return
    }
    const baseParams = {
      ...values,
      ...extraParams,
      registerSubjectId: userInfo?.currentIns?.subjectRegistrationId || '',
      dataRegistCode
    }
    if (dataRegistId) {
      baseParams.dataRegistId = dataRegistId
    }
    const afterValues = await submitTransform(baseParams, true)
    const { code, data } =
      await regApplyApi.submitOrSaveRegApplyDraft(afterValues)
    if (code === 20000 && data) {
      navigate('/manage/regApply/regApplyList')
      window.$message.success('保存草稿成功')
    }
  }
  // 表单回填
  const fillForm = async () => {
    const { code, data } = await regApplyApi.getRegApplyDetail({
      dataRegistId
    })
    if (code === 20000) {
      setDetail(data)
      setTimeout(() => {
        formRef.current?.setFieldsValue(getFullFieldParams(data))
      }, 500)
    }
    setLoading(false)
  }
  useEffect(() => {
    if (dataRegistId) {
      setLoading(true)
      fillForm()
    }
  }, [dataRegistId])
  const regApproTypeSubTitle = useMemo(
    () =>
      regApproTypeEnum.find((item) => item.value === regApproType)?.subTitle ||
      '',
    [regApproType]
  )
  return (
    <FormContext.Provider value={{ detail, extraParams, setExtraParams }}>
      <Spin spinning={loading}>
        <div className={styles.regFormContainer}>
          <ProForm
            style={{ padding: 20 }}
            layout='horizontal'
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            formRef={formRef}
            onFinish={onFinish}
            onFinishFailed={() => {
              console.log('onFinishFailed', formRef.current?.getFieldsValue())
            }}
            initialValues={initialValues}
            submitter={false}
          >
            {['2', '3', '4', '5'].includes(regApproType) ? (
              <>
                <ProForm.Group
                  title={groupTitle(`${regApproTypeSubTitle}数据`)}
                >
                  <UpdateInfo />
                </ProForm.Group>
                <ProForm.Group
                  title={groupTitle(`${regApproTypeSubTitle}原因`)}
                >
                  <UpdateReason
                    uploadOnlyId={uploadOnlyId}
                    setUploadCount={setUploadCount}
                    templateFiles={{
                      productAndServiceDetails:
                        templateFileRecord?.productAndServiceDetails,
                      infoSecurityAssessReport:
                        templateFileRecord?.infoSecurityAssessReport
                    }}
                  />
                </ProForm.Group>
              </>
            ) : null}
            {['1', '2', '3'].includes(regApproType) || !regApproType ? (
              <>
                <ProForm.Group title={groupTitle('数据基本信息')}>
                  <BaseData
                    uploadOnlyId={uploadOnlyId}
                    setUploadCount={setUploadCount}
                    templateFiles={{
                      productAndServiceDetails:
                        templateFileRecord?.productAndServiceDetails,
                      infoSecurityAssessReport:
                        templateFileRecord?.infoSecurityAssessReport
                    }}
                  />
                </ProForm.Group>
                <ProForm.Group title={groupTitle('委托代理信息')}>
                  <ProxyData
                    uploadOnlyId={uploadOnlyId}
                    setUploadCount={setUploadCount}
                    templateFiles={{
                      entrustedAgentAgree:
                        templateFileRecord?.entrustedAgentAgree
                    }}
                  />
                </ProForm.Group>
                <ProForm.Group title={groupTitle('数据存储信息')}>
                  <StorageData
                    uploadOnlyId={uploadOnlyId}
                    setUploadCount={setUploadCount}
                    templateFiles={{
                      depositProofDocument:
                        templateFileRecord?.depositProofDocument
                    }}
                  />
                </ProForm.Group>
                <ProForm.Group title={groupTitle('数据场景说明')}>
                  <SceneData />
                </ProForm.Group>
                <ProForm.Group title={groupTitle('数据共享开放信息')}>
                  <OpenData />
                </ProForm.Group>
                <ProForm.Group title={groupTitle('共有数据信息')}>
                  <ShareData
                    uploadOnlyId={uploadOnlyId}
                    setUploadCount={setUploadCount}
                  />
                </ProForm.Group>
                <ProForm.Group title={groupTitle('数据目录信息')}>
                  <DirecData
                    uploadOnlyId={uploadOnlyId}
                    setUploadCount={setUploadCount}
                    templateFiles={{
                      demandFile2017: templateFileRecord?.demandFile2017,
                      demandFile2022: templateFileRecord?.demandFile2022,
                      demandFile: templateFileRecord?.demandFile,
                      sampleData: templateFileRecord?.sampleData
                    }}
                  />
                </ProForm.Group>
                <ProForm.Group title={groupTitle('数据合规性来源及承诺')}>
                  <DataSource
                    uploadOnlyId={uploadOnlyId}
                    setUploadCount={setUploadCount}
                    templateFiles={{
                      dataSourceCommitment:
                        templateFileRecord?.dataSourceCommitment
                    }}
                  />
                </ProForm.Group>
              </>
            ) : null}
          </ProForm>
          <div style={{ height: 40 }}></div>
          <div className={styles.customSubmitter}>
            <Flex justify='flex-end' gap={10}>
              <Button
                type='default'
                onClick={() => formRef.current?.resetFields()}
              >
                重置
              </Button>
              <Button
                type='primary'
                loading={loading}
                onClick={() => {
                  formRef.current?.submit()
                }}
              >
                提交
              </Button>
              <Button type='default' onClick={onSaveDraft} loading={loading}>
                保存
              </Button>
            </Flex>
          </div>
        </div>
      </Spin>
    </FormContext.Provider>
  )
}

export default RegForm
