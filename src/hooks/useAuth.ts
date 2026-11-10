import useModal from './useModal'

const useAuth = () => {
  const { isLoggedIn, userInfo } = useModal('user')
  return {
    isLoggedIn,
    userInfo
  }
}

export default useAuth
