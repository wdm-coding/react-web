import { Outlet, Link } from 'react-router-dom';
import { Space, Button } from 'antd';
import { useUserStore } from '@/store/userStore';
const ClientLayout = () => {
  const userStore = useUserStore();
  const onLogout = async () => {
    const isLogout = await userStore.userLogout();
    if (isLogout) {
      window.location.href = '/';
    }
  };
  return (
    <div>
      <div className='header'>
        {userStore.userInfo && (
          <Button type='primary' onClick={onLogout}>
            退出登录
          </Button>
        )}
      </div>
      <Space>
        <Link to='/client/home'>首页</Link>
        <Link to='/client/about'>关于我</Link>
        <Link to='/manage'>管理端</Link>
      </Space>
      <Outlet />
    </div>
  );
};
export default ClientLayout;
