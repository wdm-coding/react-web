import { useEffect, useState } from 'react'
import { Button, Form, Input, Modal, Upload } from 'antd'
import type { UploadFile, UploadProps } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { DATA_REGIST_TYPE_MAP } from '@/dict'
import type { RegPublicItem } from '@/api/portal/regPublic'
import styles from './index.module.scss'

const MAX_FILE_SIZE = 10 * 1024 * 1024
const MAX_FILE_COUNT = 5

/** 异议申诉表单值 */
export interface ObjectionFormValues {
  objectionReason: string
  files: UploadFile[]
}

interface Props {
  open: boolean
  record: RegPublicItem | null
  onCancel: () => void
  /** 返回 true 表示提交成功，弹窗关闭并重置表单 */
  onSubmit: (values: ObjectionFormValues) => Promise<boolean>
}

const formatDate = (value?: string) =>
  value ? dayjs(value).format('YYYY-MM-DD') : '-'

/** 异议申诉弹窗 */
const ObjectionModal = ({ open, record, onCancel, onSubmit }: Props) => {
  const [form] = Form.useForm<ObjectionFormValues>()
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (open) form.resetFields()
  }, [open, form])

  const beforeUpload: UploadProps['beforeUpload'] = (file) => {
    if (file.size > MAX_FILE_SIZE) {
      window.$message.error('单个文件大小不能超过10MB')
      return Upload.LIST_IGNORE
    }
    return false
  }

  const handleOk = async () => {
    let values: ObjectionFormValues
    try {
      values = await form.validateFields()
    } catch {
      return
    }
    setSubmitting(true)
    try {
      const success = await onSubmit(values)
      if (success) form.resetFields()
    } catch {
      // 错误提示由响应拦截器统一处理
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal
      open={open}
      title='异议申诉'
      width={800}
      okText='提交'
      cancelText='取消'
      confirmLoading={submitting}
      okButtonProps={{ danger: true }}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <div className={styles.info}>
        <div className={styles.infoItem}>
          <span className={styles.label}>登记数据名称：</span>
          <span className={styles.value}>{record?.dataRegistName || '-'}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>登记数据类型：</span>
          <span className={styles.value}>
            {DATA_REGIST_TYPE_MAP[record?.dataRegistType ?? ''] ?? '-'}
          </span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>数据登记编码：</span>
          <span className={styles.value}>{record?.dataRegistId || '-'}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>公示日期：</span>
          <span className={styles.value}>
            {formatDate(record?.startDate)} ~ {formatDate(record?.endDate)}
          </span>
        </div>
      </div>

      <Form form={form} className={styles.form} layout='vertical'>
        <Form.Item
          label='异议申诉理由'
          name='reason'
          rules={[{ required: true, message: '请输入异议申诉理由' }]}
        >
          <Input.TextArea
            placeholder='请输入'
            maxLength={1024}
            showCount
            autoSize={{ minRows: 5, maxRows: 8 }}
          />
        </Form.Item>
        <Form.Item
          label='异议申诉材料'
          name='applyMaterial'
          required
          valuePropName='fileList'
          getValueFromEvent={(event) => event.fileList}
          extra={`仅支持上传不超过${MAX_FILE_COUNT}个10MB以内的文件`}
          rules={[
            {
              validator: (_, value: UploadFile[] = []) =>
                value.length > 0
                  ? Promise.resolve()
                  : Promise.reject(new Error('请上传异议申诉材料'))
            }
          ]}
        >
          <Upload
            multiple
            maxCount={MAX_FILE_COUNT}
            beforeUpload={beforeUpload}
          >
            <Button icon={<UploadOutlined />}>单击上传</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ObjectionModal
