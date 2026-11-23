import { BrowserRouter } from 'react-router-dom'
import AppRouter from '@/router/AppRouter'
import { App as AntdApp, ConfigProvider } from 'antd'
import useModal from '@/hooks/useModal'
import AuthModal from '@/components/AuthModal'
import ErrorBoundary from '@/components/ErrorBoundary'
import { useEffect } from 'react'
import zhCN from 'antd/locale/zh_CN'

function App() {
  const { checkLogin } = useModal('user')
  useEffect(() => {
    checkLogin()
  }, [])
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        components: {
          Input: {
            borderRadius: 0
          }
        }
      }}
    >
      <BrowserRouter basename={import.meta.env.VITE_BASE_PATH}>
        <AntdApp>
          <ErrorBoundary>
            <AuthModal />
            <AppRouter />
          </ErrorBoundary>
        </AntdApp>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
