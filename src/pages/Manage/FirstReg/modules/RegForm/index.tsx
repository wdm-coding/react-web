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
import { Button, Flex, Spin } from 'antd'
import { initialValues } from './config'
import {
  getSubmitApi,
  submitTransform,
  getFullFieldParams,
  templateFileExtract
} from './utils/index'
import { useNavigate } from 'react-router-dom'
import useModal from '@/hooks/useModal'
import { regApproTypeEnum } from '@/pages/Manage/Enum'
import UpdateReason from './group/UpdateReason'
import UpdateInfo from './group/UpdateInfo'
import ConfirmInfo from '../ConfimInfo'
export const FormContext = createContext(null)
const RegForm = ({
  dataRegistId, // 登记数据ID
  orgDataRegistId, // 原始登记数据ID
  regApproType,
  openChangeModal
}: {
  dataRegistId?: string
  orgDataRegistId?: string
  regApproType?: string
  openChangeModal: (open: boolean) => void
}) => {
  const navigate = useNavigate()
  // 变更登记弹窗确认按钮状态
  const [isDraft, setIsDraft] = useState<boolean>(false)
  // 确认登记弹弹窗状态
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false)
  const [submitLoading, setSubmitLoading] = useState<boolean>(false)
  // 加载详情状态
  const [loading, setLoading] = useState<boolean>(false)
  const { userInfo } = useModal('user')
  const [detail, setDetail] = useState<any>(null)
  const [extraParams, setExtraParams] = useState<any>(null)
  const formRef = useRef<ProFormInstance>(null)
  const { data: uploadOnlyId } = useRequest(FileApi.getFileUploadOnlyId)
  const { data: templateFiles } = useRequest(() =>
    FileApi.getTemplateFiles({ pageSize: 999 })
  )
  // 监测表单所有文件上传状态
  const [uploadCount, setUploadCount] = useState<number>(0)
  // 模板文件记录
  const templateFileRecord = useMemo(
    () => templateFileExtract(templateFiles?.content || []),
    [templateFiles]
  )
  // 表单分组标题
  const groupTitle = (title: string) => {
    return (
      <div key={title} className={styles.groupTitle}>
        <span style={{ paddingLeft: 10 }}>{title}</span>
      </div>
    )
  }
  // 获取dataRegistCode
  const dataRegistCode = useMemo(() => {
    return detail?.dataRegistCode || uploadOnlyId || ''
  }, [detail, uploadOnlyId])

  // 保存草稿前校验
  const onBeforeSave = () => {
    const values = formRef.current?.getFieldsValue()
    if (!values?.coverageArea) {
      window.$message.error('请选择覆盖区域')
      return null
    }
    if (!values?.industry) {
      window.$message.error('请选择行业')
      return null
    }
    if (!values?.dataName) {
      window.$message.error('请输入数据登记名称')
      return null
    }
    return values
  }

  // 表单校验通过
  const onFinish = async () => {
    setIsDraft(false) // 提交时默认不是草稿
    if (regApproType === '4' || regApproType === '5') {
      // const values = formRef.current?.getFieldsValue()
      // onSubmit({
      //   applyForProof
      //   dataRegistId
      //   orgDataRegistName
      //   personage
      //   proofMaterials
      //   supplement
      // })
      return
    }
    setConfirmOpen(true) // 打开确认弹窗
  }
  // 提交表单
  const onSubmit = async (values: any) => {
    const baseParams = {
      ...values,
      registerSubjectId: userInfo?.currentIns?.subjectRegistrationId || '',
      dataRegistCode,
      ...extraParams
    }
    if (dataRegistId) {
      baseParams.dataRegistId = dataRegistId
    }
    if (orgDataRegistId) {
      baseParams.orgDataRegistId = orgDataRegistId
    }
    const afterValues = await submitTransform(baseParams, isDraft)
    const { api, afterPath } = getSubmitApi(regApproType)
    console.log('onSubmit', api, afterPath, afterValues)
    const { code, data } = await api(afterValues)
    if (code === 20000 && data) {
      setConfirmOpen(false)
      navigate(afterPath)
      window.$message.success(isDraft ? '草稿保存成功' : '登记申请提交成功')
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
        formRef.current?.setFieldsValue(getFullFieldParams(data, regApproType))
      }, 500)
    }
    setLoading(false)
  }
  // 确认信息提交
  const onConfirm = async () => {
    setSubmitLoading(true)
    const values = onBeforeSave()
    if (values) {
      await onSubmit(values)
    }
    setSubmitLoading(false)
  }
  // 加载表单时回填数据
  useEffect(() => {
    if (dataRegistId) {
      setLoading(true)
      fillForm()
    }
  }, [dataRegistId])
  // 获取登记类型标题
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
                  extra={
                    <Button
                      type='primary'
                      onClick={() => openChangeModal(true)}
                    >
                      选择数据
                    </Button>
                  }
                >
                  <UpdateInfo detail={detail} />
                </ProForm.Group>
                <ProForm.Group
                  title={groupTitle(`${regApproTypeSubTitle}原因`)}
                >
                  <UpdateReason
                    regApproType={regApproType}
                    uploadOnlyId={uploadOnlyId}
                    setUploadCount={setUploadCount}
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
                onClick={() => {
                  if (uploadCount !== 0) {
                    window.$message.warning('请等待文件上传完成')
                    return
                  }
                  formRef.current?.submit()
                }}
              >
                提交
              </Button>
              {!['4', '5'].includes(regApproType) && (
                <Button
                  type='default'
                  onClick={() => {
                    if (uploadCount !== 0) {
                      window.$message.warning('请等待文件上传完成')
                      return
                    }
                    setIsDraft(true) // 保存草稿时设置为草稿
                    const values = onBeforeSave() // 校验草稿前信息
                    if (values) {
                      setConfirmOpen(true)
                    }
                  }}
                >
                  保存
                </Button>
              )}
            </Flex>
          </div>
        </div>
      </Spin>
      {/* 确认登记信息弹窗 */}
      <ConfirmInfo
        values={getFullFieldParams(detail, regApproType)}
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={onConfirm}
        loading={submitLoading}
      />
    </FormContext.Provider>
  )
}

export default RegForm
