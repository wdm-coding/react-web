import styles from './index.module.scss'
import { Button, Form, Input } from 'antd'
import type { FormProps } from 'antd'
type FieldType = {
  username: string
  password: string
  confirmPassword?: string
}
const stylesObject: FormProps['styles'] = {
  label: {
    color: '#fff'
  }
}
const RegisterPage: React.FC = () => {
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log(values)
  }
  return (
    <div>
      <Form
        name='register'
        className={styles.form}
        style={{ width: '100%' }}
        styles={stylesObject}
        initialValues={{
          username: 'admin',
          password: '123456'
        }}
        onFinish={onFinish}
        autoComplete='off'
        layout='vertical'
      >
        <Form.Item<FieldType>
          label='用户名'
          name='username'
          rules={[{ required: true, message: '请输入用户名！' }]}
        >
          <Input placeholder='请输入用户名' />
        </Form.Item>

        <Form.Item<FieldType>
          label='密码'
          name='password'
          rules={[{ required: true, message: '请输入密码！' }]}
        >
          <Input.Password placeholder='请输入密码' />
        </Form.Item>

        <Form.Item<FieldType>
          label='确认密码'
          name='confirmPassword'
          rules={[{ required: true, message: '请输入确认密码！' }]}
        >
          <Input.Password placeholder='请输入确认密码' />
        </Form.Item>

        <Form.Item label={null}>
          <Button
            type='primary'
            htmlType='submit'
            style={{ width: '100%', height: '50px', borderRadius: '14px' }}
          >
            用户注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default RegisterPage
