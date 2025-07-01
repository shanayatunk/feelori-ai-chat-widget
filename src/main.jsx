import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

export default function mountFeeloriChat() {
  const rootElement = document.getElementById('feelori-chat');
  if (rootElement) {
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  } else {
    console.error('FeelOri chat root element not found!');
  }
}
