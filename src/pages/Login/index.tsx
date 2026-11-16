import styles from './index.module.scss'
import useModal from '@/hooks/useModal'
import { SafetyOutlined, UnlockOutlined, UserOutlined } from '@ant-design/icons'
import { Form, Input, Button, Spin, Modal } from 'antd'
import classnames from 'classnames'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
interface FieldType {
  username: string
  password: string
  captcha: string
}
const loginMethodOptions = [
  {
    label: '主体账号',
    value: 'subject'
  },
  {
    label: '个人账号',
    value: 'personal'
  }
]
const Login = () => {
  const [formRef] = Form.useForm()
  const navigate = useNavigate()
  const [loginMethod, setLoginMethod] = useState<'subject' | 'personal'>(
    'subject'
  )
  const { siteName, env } = useModal('global')
  const [modalOpen, setModalOpen] = useState(false)
  const [tokenCookie, setTokenCookie] = useState('')
  const { fetchCaptcha, userLogin } = useModal('user')
  const [captcha, setCaptcha] = useState<any>({
    loading: false,
    captchaImg: ''
  })
  const getCaptch = async ()=>{
    setCaptcha({...captcha,loading: true})
    const base64Str = await fetchCaptcha()
    setCaptcha({...captcha,loading: false,captchaImg: base64Str})
  }
  useEffect(()=>{
    getCaptch()
  },[])
  const onFinish = async (values: FieldType) => {
    const params:any = {
      "captcha": values.captcha,
      "password": values.password,
      "loginAfter": "/portal",
      "loginMethod": 1,
    }
    if(loginMethod === 'subject'){
      params.institutioncode = values.username
    }else{
      params.idnumber = values.username
    }
    try {
      const redirectUrl = await userLogin(params)
      navigate(redirectUrl, { replace: true })
      window.$message.success('登录成功')
    } catch (error) {
      console.log('账号密码-登录失败', error)
    }
  }
  const handleOk = async () => {
    setModalOpen(false)
    setTokenCookie(tokenCookie)
    const date = new Date();
    date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);
    document.cookie = `token=${tokenCookie}; expires=${date}; path=/`
    document.cookie = `hasToken=hasToken; expires=${date}; path=/`
    window.location.reload()
  }
  const handleCancel = () => {
    setModalOpen(false)
    setTokenCookie('')
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
    document.cookie = 'hasToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
  }
  const tokenLogin = async () => {
     const cookie = document.cookie
      if(cookie.indexOf('hasToken=hasToken') !== -1){
        try {
          const redirectUrl = await userLogin({tokenCookie:'1'})
          navigate(redirectUrl, { replace: true })
          window.$message.success('登录成功')
        } catch (error) {
          console.log('token-登录失败', error)
        }
      }
  }
  useEffect(()=>{
    if(env === 'dev'){
      tokenLogin()
    }
  },[env])
  return (
    <div className={styles.loginWrapper}>
      {/* 顶部标题 */}
      <h1 className={styles.title}>{siteName}</h1>
      {/* 登录卡片 */}
      <div className={styles.loginCard}>
        <h2 className={styles.welcome}>欢迎登录</h2>
        <div className={styles.segmented}>
          {loginMethodOptions.map(
            (item: { label: string; value: 'subject' | 'personal' }) => (
              <div
                onClick={() => {
                  formRef?.resetFields()
                  setLoginMethod(item.value)
                  getCaptch()
                }}
                key={item.value}
                className={classnames(styles.segmentedItem, {
                  [styles.active]: loginMethod === item.value
                })}
              >
                {item.label}
              </div>
            )
          )}
        </div>
        <Form
          name='loginForm'
          form={formRef}
          labelCol={{ span: 0 }}
          wrapperCol={{ span: 24 }}
          style={{ width: 400 }}
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
              style={{ height: '50px' }}
              prefix={
                <UserOutlined style={{ fontSize: '16px', color: '#006BD3' }} />
              }
            />
          </Form.Item>

          <Form.Item<FieldType>
            label='Password'
            name='password'
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password
              placeholder='请输入密码'
              style={{ height: '50px' }}
              prefix={
                <UnlockOutlined
                  style={{ fontSize: '16px', color: '#006BD3' }}
                />
              }
            />
          </Form.Item>

          <Form.Item<FieldType>
            label='captcha'
            name='captcha'
            rules={[{ required: true, message: '请输入验证码' }]}
          >
            <div className='flex items-center gap-8'>
              <Input
                placeholder='请输入验证码'
                style={{ width: '17.66vw', height: '50px' }}
                prefix={
                  <SafetyOutlined
                    style={{ fontSize: '16px', color: '#006BD3' }}
                  />
                }
              />
              <div className={styles.captchaContainer}>
                <Spin size='small' spinning={captcha.loading}>
                  {captcha.loading ? (
                    <div className={styles.captchaLoading} style={{ width: '9.38vw', height: '50px' }}>
                      加载中
                    </div>
                  ) : (
                    <img
                      src={`data:image/png;base64,${captcha?.captchaImg}`}
                      style={{ width: '9.38vw', height: '50px' }}
                      onClick={() => getCaptch()}
                      alt='验证码'
                    />
                  )}
                </Spin>
              </div>
            </div>
          </Form.Item>

          <Form.Item label={null}>
            <Button
              type='primary'
              htmlType='submit'
              style={{
                width: '100%',
                height: '50px',
                background: 'linear-gradient( 271deg, #006BD3 0%, #0091FF 100%)'
              }}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
        <div
          className='text-center cursor-pointer'
          style={{ color: '#006BD3' }}
          onClick={() => navigate(-1)}
        >
          返回上一页
        </div>
      </div>
      {
        env === 'dev' && <>
          <div className={styles.tokenLogin} onClick={() => setModalOpen(true)}>token登录</div>
          <Modal
            title="token登录"
            closable={{ 'aria-label': 'Custom Close Button' }}
            okText='登录'
            cancelText='取消'
            open={modalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Input placeholder='请输入token' value={tokenCookie} onChange={(e) => setTokenCookie(e.target.value)} />
          </Modal>
        </>
      }
    </div>
  )
}

export default Login
