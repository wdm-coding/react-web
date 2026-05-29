import { Card } from 'antd';
import { useUserStore } from '@/store/userStore';
const Home: React.FC = () => {
  const username = useUserStore((state) => state.userInfo?.username);
  return (
    <div className='w-full h-full flex bg-amber-400 px-10 py-10'>
      <Card className='w-1/3 h-1/3'>
        <div>欢迎来到首页1，{username}</div>
      </Card>
    </div>
  );
};
export default Home;
