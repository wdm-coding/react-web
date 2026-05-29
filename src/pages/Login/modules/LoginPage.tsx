import styles from './index.module.scss';
import { Button, Form, Input } from 'antd';
import type { FormProps } from 'antd';
import { useUserStore } from '@/store/userStore';
import { useNavigate, useSearchParams } from 'react-router-dom';
type FieldType = {
  username: string;
  password: string;
};
const stylesObject: FormProps['styles'] = {
  label: {
    color: '#fff',
  },
};
const LoginPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect');
  const navigate = useNavigate();
  const userLogin = useUserStore((s) => s.userLogin);
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      const loginAfter = await userLogin(values);
      navigate(redirect || loginAfter, { replace: true });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Form
        name='login'
        className={styles.form}
        style={{ width: '100%' }}
        styles={stylesObject}
        initialValues={{
          username: 'admin',
          password: '123456',
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
          <Input placeholder='请输入用户名' autoComplete='off' />
        </Form.Item>

        <Form.Item<FieldType>
          label='密码'
          name='password'
          rules={[{ required: true, message: '请输入密码！' }]}
        >
          <Input.Password placeholder='请输入密码' autoComplete='new-password' />
        </Form.Item>

        <Form.Item label={null}>
          <Button
            type='primary'
            htmlType='submit'
            style={{ width: '100%', height: '50px', borderRadius: '14px' }}
          >
            用户登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default LoginPage;
