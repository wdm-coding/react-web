import { BrowserRouter } from 'react-router-dom'
import AppRouter from '@/router/AppRouter'
import { App as AntdApp, ConfigProvider } from 'antd'
function App() {
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
