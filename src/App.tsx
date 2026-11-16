import { BrowserRouter } from 'react-router-dom'
import AppRouter from '@/router/AppRouter'
import { App as AntdApp, ConfigProvider } from 'antd'
import useModal from '@/hooks/useModal'
import { useEffect } from 'react'

function App() {
  const {checkLogin} = useModal('user')
  useEffect(() => {
    checkLogin()
  }, [])
  return (
    <ConfigProvider theme={{ 
      components: {
        Input: {
          borderRadius: 0,
        }
      }
    }}>
      <BrowserRouter basename={import.meta.env.VITE_BASE_PATH}>
        <AntdApp>
          <AppRouter />
        </AntdApp>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
