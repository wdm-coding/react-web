import styles from './index.module.scss';
import logo from '@/assets/images/common/logo.jpeg';
import LoginPage from './modules/LoginPage';
import RegisterPage from './modules/RegisterPage';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isLoginPage, setIsLoginPage] = useState(true);
  const toggleLoginPage = () => {
    setIsLoginPage(!isLoginPage);
  };
  return (
    <div className={styles.container}>
      <div></div>
      <div className={styles.centerBox}>
        <div className='flex items-center justify-center flex-col text-amber-50'>
          <img
            src={logo}
            alt='logo'
            style={{ width: '50px', height: '50px', borderRadius: '50%' }}
          />
          <span className='text-2xl font-bold mt-2 mb-2'>
            {isLoginPage ? '用户登录' : '用户注册'}
          </span>
        </div>
        <div className={styles.formContainer}>
          {isLoginPage ? <LoginPage></LoginPage> : <RegisterPage></RegisterPage>}
        </div>
        <div className='flex flex-col justify-between items-center'>
          <div
            className='text-sm cursor-pointer'
            style={{ color: '#5c27fa' }}
            onClick={toggleLoginPage}
          >
            {isLoginPage ? '没有账号？去注册' : '已有账号？去登录'}
          </div>
          <div
            className='text-sm mt-3 cursor-pointer'
            style={{ color: 'rgba(255,255,255,0.5)' }}
            onClick={() => navigate('/client/home')}
          >
            ← 返回首页
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
