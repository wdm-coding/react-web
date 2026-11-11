import styles from './index.module.scss'
import useModal from '@/hooks/useModal'
import { LockOutlined, SafetyOutlined, UnlockOutlined, UserOutlined } from '@ant-design/icons'
import { Form, Input, Checkbox, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
interface FieldType {
  username: string
  password: string
  verifyCode: string
}
const Login = () => {
  const navigate = useNavigate()
  const { siteName } = useModal('global')
  const onFinish = (values: FieldType) => {
    console.log(values)
  }
  return (
    <div className={styles.loginWrapper}>
      {/* 顶部标题 */}
      <h1 className={styles.title}>{siteName}</h1>
      {/* 登录卡片 */}
      <div className={styles.loginCard}>
        <h2 className={styles.welcome}>欢迎登录</h2>
        <Form
          name='basic'
          labelCol={{ span: 0 }}
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplete='off'
        >
          <Form.Item<FieldType>
            label='Username'
            name='username'
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input
              placeholder='请输入用户名'
              style={{ height: '6.3vh' }}
              prefix={<UserOutlined style={{ fontSize: '16px', color: '#006BD3' }}/>}
            />
          </Form.Item>

          <Form.Item<FieldType>
            label='Password'
            name='password'
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password
              placeholder='请输入密码'
              style={{ height: '6.3vh' }}
              prefix={<UnlockOutlined style={{ fontSize: '16px', color: '#006BD3' }}/>}
            />
          </Form.Item>

          <Form.Item<FieldType>
            label='verifyCode'
            name='verifyCode'
            rules={[{ required: true, message: '请输入验证码' }]}
          >
            <div className='flex items-center gap-8'>
              <Input
                placeholder='请输入验证码'
                style={{ width: '17.66vw', height: '6.3vh' }}
                prefix={<SafetyOutlined style={{ fontSize: '16px', color: '#006BD3' }} />}
              />
              <img
                src='/Portal/images/verifyCode.png'
                alt=''
                style={{ width: '9.38vw', height: '6.3vh' }}
              />
            </div>
          </Form.Item>

          <Form.Item label={null}>
            <Button
              type='primary'
              htmlType='submit'
              style={{
                width: '100%',
                height: '6.3vh',
                background: 'linear-gradient( 271deg, #006BD3 0%, #0091FF 100%)'
              }}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
        <div
          className='text-center'
          style={{ color: '#006BD3' }}
          onClick={() => navigate(-1)}
        >
          返回上一页
        </div>
      </div>
    </div>
  )
}

export default Login
