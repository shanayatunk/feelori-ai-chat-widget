import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Make it globally available
window.FeeloriChat = {
  mountFeeloriChat: () => {
    const el = document.getElementById('feelori-chat');
    if (el) {
      createRoot(el).render(
        <StrictMode>
          <App />
        </StrictMode>
      );
    } else {
      console.error('feelori-chat div not found!');
    }
  }
};
