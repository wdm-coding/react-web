import { Outlet, Link } from 'react-router-dom';
import { Space } from 'antd';
const ManageLayout = () => {
  return (
    <div>
      <Space>
        <Link to='/manage/dashboard'>仪表盘</Link>
        <Link to='/manage/systemManage/menuManage'>菜单管理</Link>
        <Link to='/manage/systemManage/userManage'>用户管理</Link>
        <Link to='/client'>客户端</Link>
      </Space>
      <Outlet />
    </div>
  );
};
export default ManageLayout;
