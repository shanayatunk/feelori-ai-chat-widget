import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import ChatWidget from './components/ChatWidget.jsx';

// This function will be called from your Shopify theme.
// It now accepts the backend URL as an argument.
window.mountFeeloriWidget = (backendUrl) => {
  // Create a new div for the widget and add it to the page
  const widgetDiv = document.createElement('div');
  widgetDiv.id = 'feelori-chat-widget-root';
  document.body.appendChild(widgetDiv);

  // Render ONLY the ChatWidget component and pass the backendUrl to it
  createRoot(widgetDiv).render(
    <StrictMode>
      <ChatWidget backendUrl={backendUrl} />
    </StrictMode>
  );
};