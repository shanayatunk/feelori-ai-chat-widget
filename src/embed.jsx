import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
// Import the new wrapper component
import ChatWidgetWrapper from './components/ChatWidgetWrapper.jsx';

// This function will be called from your Shopify theme
window.mountFeeloriWidget = (backendUrl) => {
  const widgetDiv = document.createElement('div');
  widgetDiv.id = 'feelori-chat-widget-root';
  document.body.appendChild(widgetDiv);

  // Render the new wrapper and pass the backendUrl to it
  createRoot(widgetDiv).render(
    <StrictMode>
      <ChatWidgetWrapper backendUrl={backendUrl} />
    </StrictMode>
  );
};