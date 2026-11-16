import useModal from './useModal'

const useAuth = () => {
  const { isLoggedIn, userInfo } = useModal('user')
  return {
    isLoggedIn, // 是否登录
    accountRole: userInfo?.personage ? 'personal' : 'subject', // 账号角色 个人/主体
    isAdmin: !!userInfo?.anAdmin, // 是否管理员
    menuShow: userInfo?.menuShow || [] // 菜单权限
  }
}

export default useAuth
