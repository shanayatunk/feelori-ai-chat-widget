import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('feelori-chat')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
