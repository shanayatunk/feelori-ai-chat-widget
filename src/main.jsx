import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// Expose a global function to mount the chat widget
window.FeeloriChat = {
  mountFeeloriChat: () => {
    const rootElement = document.getElementById('feelori-chat');
    if (rootElement) {
      createRoot(rootElement).render(
        <StrictMode>
          <App />
        </StrictMode>
      );
    } else {
      console.error('feelori-chat div not found!');
    }
  }
};
