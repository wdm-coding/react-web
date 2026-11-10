import useModal from '@/hooks/useModal'

const PortalHome = () => {
  const { userInfo, setUserInfo, clearUserInfo } = useModal('user')
  return (
    <div style={{paddingTop:'100px'}}>
      <h1>PortalHome</h1>
      <p>userInfo: {JSON.stringify(userInfo)}</p>
      <button onClick={() => setUserInfo({ name: 'wdm' })}>setUserInfo</button>
      <br />
      <button onClick={() => clearUserInfo()}>clearUserInfo</button>
    </div>
  )
}

export default PortalHome
