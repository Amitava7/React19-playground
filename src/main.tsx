import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!, {
  onCaughtError(error: unknown, errorInfo) {
    console.error('[React 19] onCaughtError:', (error as Error).message)
    console.error('Component stack:', errorInfo.componentStack)
  },
  onUncaughtError(error: unknown, _errorInfo) {
    console.error('[React 19] onUncaughtError:', (error as Error).message)
  },
  onRecoverableError(error: unknown) {
    console.warn('[React 19] onRecoverableError:', (error as Error).message)
  },
}).render(
  <StrictMode>
    <App />
  </StrictMode>
)
