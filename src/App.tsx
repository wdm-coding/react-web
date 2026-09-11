import { BrowserRouter } from 'react-router-dom'
import AppRouter from '@/router/AppRouter'
import { App as AntdApp } from 'antd'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AntdApp>
          <AppRouter />
        </AntdApp>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
