import { Button, Col, Form, Row, Upload } from 'antd'
import type { FormInstance, UploadFile, UploadProps } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import CaptchaField from '../CaptchaField'
import styles from './index.module.scss'

export interface FileFormValues {
  ofdFile: UploadFile[]
  verificationCode: string
}

interface Props {
  form: FormInstance<FileFormValues>
  submitting: boolean
  captcha: string
  onRefreshCaptcha: () => void
  onSubmit: (values: FileFormValues) => void
  beforeUpload: UploadProps['beforeUpload']
  customRequest: UploadProps['customRequest']
}

/** 文件上传查验表单 */
const FileFormPanel = ({
  form,
  submitting,
  captcha,
  onRefreshCaptcha,
  onSubmit,
  beforeUpload,
  customRequest
}: Props) => (
  <div className={styles.formWrap}>
    <Form form={form} layout='horizontal' onFinish={onSubmit}>
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            label='ofd文件'
            name='ofdFile'
            required
            valuePropName='fileList'
            getValueFromEvent={(event) => event.fileList}
            rules={[
              {
                validator: (_, value: UploadFile[] = []) => {
                  if (!value.length) {
                    return Promise.reject(new Error('请上传ofd文件！'))
                  }
                  if (value[0].status === 'uploading') {
                    return Promise.reject(new Error('文件上传中，请稍候'))
                  }
                  if (value[0].status === 'error') {
                    return Promise.reject(new Error('文件上传失败，请重新上传'))
                  }
                  return Promise.resolve()
                }
              }
            ]}
          >
            <Upload
              accept='.ofd'
              maxCount={1}
              listType='text'
              beforeUpload={beforeUpload}
              customRequest={customRequest}
            >
              <Button icon={<UploadOutlined />}>上传</Button>
            </Upload>
          </Form.Item>
        </Col>
        <Col xs={24} md={8} lg={6}>
          <Form.Item
            label='验证码'
            name='verificationCode'
            rules={[{ required: true, message: '请输入验证码！' }]}
          >
            <CaptchaField captcha={captcha} onRefresh={onRefreshCaptcha} />
          </Form.Item>
        </Col>
        <Col xs={24} xl={6} className={styles.fileActions}>
          <Button type='primary' htmlType='submit' loading={submitting}>
            立即查询
          </Button>
          <Button
            htmlType='button'
            style={{ marginLeft: 16 }}
            loading={submitting}
            onClick={() => form.resetFields()}
          >
            重置
          </Button>
        </Col>
      </Row>
    </Form>
  </div>
)

export default FileFormPanel
