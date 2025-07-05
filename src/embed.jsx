import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ChatWidgetWrapper from './components/ChatWidgetWrapper.jsx';

// This is a special Vite command to import the CSS as a string of text
import styles from './index.css?raw';

window.mountFeeloriWidget = (backendUrl) => {
  // 1. Create a simple div on the main page
  const hostElement = document.createElement('div');
  hostElement.id = 'feelori-chat-host';
  document.body.appendChild(hostElement);

  // 2. Attach a "shadow root" to it. This creates the isolated bubble.
  const shadowRoot = hostElement.attachShadow({ mode: 'open' });

  // 3. Create the element inside the shadow bubble where React will render
  const mountPoint = document.createElement('div');
  shadowRoot.appendChild(mountPoint);

  // 4. Create a <style> tag and inject all of your widget's CSS into the shadow bubble
  const styleElement = document.createElement('style');
  styleElement.innerHTML = styles;
  shadowRoot.appendChild(styleElement);
  
  // 5. Render your React app into the isolated mount point
  createRoot(mountPoint).render(
    <StrictMode>
      <ChatWidgetWrapper backendUrl={backendUrl} />
    </StrictMode>
  );
};