import { createRoot } from 'react-dom/client'
import '@/styles/index.css'
import App from './App.tsx'
const originalConsoleError = console.error
console.error = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('antd:')) {
    return
  }
  originalConsoleError(...args)
}
createRoot(document.getElementById('root')!).render(<App />)
