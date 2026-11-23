import { useCallback, useEffect, useState } from 'react'
import { Form, Tabs, Upload } from 'antd'
import type { UploadProps } from 'antd'
import RegCheckApi, { type DataInspectionResult } from '@/api/portal/regCheck'
import bannerBg from '@/assets/images/portal/rc_bg_01.png'
import InspectionResult from './modules/InspectionResult'
import ManualFormPanel, {
  type ManualFormValues
} from './modules/ManualFormPanel'
import FileFormPanel, { type FileFormValues } from './modules/FileFormPanel'
import styles from './index.module.scss'

const MAX_FILE_SIZE = 5 * 1024 * 1024
const MAX_FILE_NAME_LENGTH = 10

const RegCheck = () => {
  const [manualForm] = Form.useForm<ManualFormValues>()
  const [fileForm] = Form.useForm<FileFormValues>()

  const [captcha, setCaptcha] = useState('')
  const [dataRegistCode, setDataRegistCode] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<DataInspectionResult | null>(null)
  const [resultOpen, setResultOpen] = useState(false)

  // 刷新图形验证码，验证码 id 与登录流程保持一致存入 sessionStorage
  const refreshCaptcha = useCallback(async () => {
    try {
      const res = await RegCheckApi.getCaptcha()
      if (res?.code === 20000) {
        sessionStorage.setItem('imgCaptchaId', res.data.captchaId)
        setCaptcha(res.data.captcha)
      }
    } catch {
      // 错误提示由响应拦截器统一处理
    }
  }, [])

  useEffect(() => {
    refreshCaptcha()
    RegCheckApi.getFileOnlyId()
      .then((res) => {
        if (res?.code === 20000) setDataRegistCode(res.data)
      })
      .catch(() => {
        // 错误提示由响应拦截器统一处理
      })
  }, [refreshCaptcha])

  // 提交查验，成功则打开结果弹窗
  const submitInspection = async (formData: FormData) => {
    setSubmitting(true)
    try {
      const res = await RegCheckApi.dataInspection(
        formData,
        sessionStorage.getItem('imgCaptchaId') || ''
      )
      if (!res?.data) {
        window.$message.error('数据检查失败')
        refreshCaptcha()
        return
      }
      setResult(res.data)
      setResultOpen(true)
    } catch {
      // 验证码错误等异常，刷新验证码后重试
      refreshCaptcha()
    } finally {
      setSubmitting(false)
    }
  }

  // 手工录入查验提交
  const handleManualSubmit = (values: ManualFormValues) => {
    const formData = new FormData()
    formData.append('regNumber', values.regNumber)
    formData.append('dataRegistName', values.dataRegistName)
    formData.append('institutionName', values.institutionName)
    formData.append('verificationCode', values.verificationCode)
    submitInspection(formData)
  }

  // 文件上传查验提交
  const handleFileSubmit = (values: FileFormValues) => {
    const response = values.ofdFile?.[0]?.response as
      { resultUrl?: string } | undefined
    if (!response?.resultUrl) {
      window.$message.error('文件上传未完成，请稍后重试')
      return
    }
    const formData = new FormData()
    formData.append('ofdFile', response.resultUrl)
    formData.append('verificationCode', values.verificationCode)
    submitInspection(formData)
  }

  // 文件上传前校验
  const beforeUpload: UploadProps['beforeUpload'] = (file) => {
    const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '')
    if (nameWithoutExt.length > MAX_FILE_NAME_LENGTH) {
      window.$message.error(`文件名称不能超过${MAX_FILE_NAME_LENGTH}个字符`)
      return Upload.LIST_IGNORE
    }
    if (!/\.ofd$/i.test(file.name)) {
      window.$message.error('仅支持上传 .ofd 文件')
      return Upload.LIST_IGNORE
    }
    if (file.size > MAX_FILE_SIZE) {
      window.$message.error('文件大小不能超过 10MB')
      return Upload.LIST_IGNORE
    }
    return true
  }

  // 自定义文件上传请求
  const uploadOfd: UploadProps['customRequest'] = async ({
    file,
    onSuccess,
    onError
  }) => {
    if (!dataRegistCode) {
      window.$message.error('上传目录初始化失败，请刷新页面重试')
      onError?.(new Error('缺少上传目录标识'))
      return
    }
    try {
      const res = await RegCheckApi.uploadFile(
        dataRegistCode,
        'ofdFile',
        file as File
      )
      if (res?.code === 20000 && res.data?.resultUrl) {
        onSuccess?.(res.data)
      } else {
        onError?.(new Error('上传失败'))
      }
    } catch (error) {
      onError?.(error as Error)
    }
  }

  // 切换查验方式时重置表单
  const handleTabChange = () => {
    manualForm.resetFields()
    fileForm.resetFields()
    refreshCaptcha()
  }

  // 关闭结果弹窗时重置表单
  const handleResultClose = () => {
    setResultOpen(false)
    manualForm.resetFields()
    refreshCaptcha()
  }

  const manualPanel = (
    <ManualFormPanel
      form={manualForm}
      submitting={submitting}
      captcha={captcha}
      onRefreshCaptcha={refreshCaptcha}
      onSubmit={handleManualSubmit}
    />
  )

  const filePanel = (
    <FileFormPanel
      form={fileForm}
      submitting={submitting}
      captcha={captcha}
      onRefreshCaptcha={refreshCaptcha}
      onSubmit={handleFileSubmit}
      beforeUpload={beforeUpload}
      customRequest={uploadOfd}
    />
  )

  return (
    <div className={styles.wrap}>
      <div
        className={styles.bg}
        style={{ backgroundImage: `url(${bannerBg})` }}
      >
        <div className={styles.bannerTitle}>登记结果查验</div>
      </div>
      <div className={styles.content}>
        <Tabs
          defaultActiveKey='1'
          items={[
            { key: '1', label: '手工录入', children: manualPanel },
            { key: '2', label: '文件上传', children: filePanel }
          ]}
          onChange={handleTabChange}
        />
      </div>
      <InspectionResult
        open={resultOpen}
        result={result}
        onClose={handleResultClose}
      />
    </div>
  )
}

export default RegCheck
