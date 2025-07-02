import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import ChatWidget from './components/ChatWidget.jsx';

// This will be the function we call from Shopify
window.mountFeeloriWidget = () => {
  // Create a new div for the widget and add it to the page
  const widgetDiv = document.createElement('div');
  widgetDiv.id = 'feelori-chat-widget-root';
  document.body.appendChild(widgetDiv);

  // Render ONLY the ChatWidget component into the new div
  createRoot(widgetDiv).render(
    <StrictMode>
      <ChatWidget />
    </StrictMode>
  );
};