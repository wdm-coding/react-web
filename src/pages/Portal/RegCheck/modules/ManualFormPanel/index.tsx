import { Button, Col, Form, Input, Row } from 'antd'
import type { FormInstance } from 'antd'
import CaptchaField from '../CaptchaField'
import styles from './index.module.scss'

export interface ManualFormValues {
  regNumber: string
  dataRegistName: string
  institutionName: string
  verificationCode: string
}

interface Props {
  form: FormInstance<ManualFormValues>
  submitting: boolean
  captcha: string
  onRefreshCaptcha: () => void
  onSubmit: (values: ManualFormValues) => void
}

/** 手工录入查验表单 */
const ManualFormPanel = ({
  form,
  submitting,
  captcha,
  onRefreshCaptcha,
  onSubmit
}: Props) => (
  <div className={styles.formWrap}>
    <Form form={form} layout='vertical' onFinish={onSubmit}>
      <Row gutter={16} align='bottom'>
        <Col xs={24} sm={12} lg={5}>
          <Form.Item
            label='登记确认单编号'
            name='regNumber'
            rules={[{ required: true, message: '请输入登记确认单编号' }]}
          >
            <Input placeholder='登记确认单编号' />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} lg={5}>
          <Form.Item
            label='登记名称'
            name='dataRegistName'
            rules={[{ required: true, message: '请输入登记名称！' }]}
          >
            <Input placeholder='登记名称' />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} lg={5}>
          <Form.Item
            label='登记主体名称'
            name='institutionName'
            rules={[{ required: true, message: '请输入登记主体名称!' }]}
          >
            <Input placeholder='登记主体名称' />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} lg={5}>
          <Form.Item
            label='验证码'
            name='verificationCode'
            rules={[{ required: true, message: '请输入验证码!' }]}
          >
            <CaptchaField captcha={captcha} onRefresh={onRefreshCaptcha} />
          </Form.Item>
        </Col>
        <Col xs={24} xl={4} className={styles.actions}>
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

export default ManualFormPanel
