import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, ShoppingCart } from 'lucide-react';

const ChatWidget = ({ backendUrl }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! Welcome to Feelori! I'm here to help you find the perfect products for comfort and wellness. What can I assist you with today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    const container = chatContainerRef.current;
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async () => {
    const messageToSend = inputMessage;
    if (!messageToSend.trim() || isLoading) return;

    const userMessage = { id: Date.now(), type: 'user', content: messageToSend, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);

    setInputMessage('');
    setIsLoading(true);

    try {
      const apiUrl = `${backendUrl}/api/chat`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageToSend })
      });

      if (!response.ok) throw new Error(`Server responded with status: ${response.status}`);
      
      const data = await response.json();

      if (data.success && data.response && data.response.message) {
        const botMessage = {
          id: Date.now() + 1,
          type: 'bot',
          content: data.response.message,
          product: data.response.product,
          products: data.response.products,
          responseType: data.response.type,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error('AI response was empty or malformed');
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: "Sorry, I'm having trouble responding right now. Please try again in a moment.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickActionClick = (action) => {
    setInputMessage(action);
    setTimeout(() => sendMessage(), 0);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const ProductCard = ({ product }) => (
    <div style={{ marginTop: '8px', maxWidth: '280px', backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden', fontFamily: 'inherit' }}>
      <div style={{ padding: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <div style={{ width: '60px', height: '60px', backgroundColor: '#f0f0f0', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <ShoppingCart style={{ width: '24px', height: '24px', color: '#aaa' }} />
          </div>
          <div>
            <h4 style={{ fontWeight: 600, fontSize: '14px', margin: 0, color: '#333' }}>{product.title || product.name}</h4>
            <div style={{ marginTop: '8px' }}>
              <span style={{ fontWeight: 700, fontSize: '14px', color: '#16a34a' }}>₹{product.price}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ProductList = ({ products }) => (
    <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {products?.slice(0, 3).map((product) => <ProductCard key={product.id} product={product} />)}
    </div>
  );

  const MessageBubble = ({ message }) => (
    <div style={{ display: 'flex', justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start', marginBottom: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', maxWidth: '90%', flexDirection: message.type === 'user' ? 'row-reverse' : 'row' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, backgroundColor: message.type === 'user' ? '#3b82f6' : '#a855f7' }}>
          {message.type === 'user' ? <User style={{ color: '#fff', width: '16px' }} /> : <Bot style={{ color: '#fff', width: '16px' }} />}
        </div>
        <div style={{ borderRadius: '12px', padding: '12px', backgroundColor: message.type === 'user' ? '#3b82f6' : '#f3f4f6', color: message.type === 'user' ? 'white' : '#1f2937' }}>
          <p style={{ fontSize: '14px', margin: 0, fontFamily: 'inherit' }}>{message.content}</p>
          {message.product && <ProductCard product={message.product} />}
          {message.products && <ProductList products={message.products} />}
          <p style={{ fontSize: '11px', opacity: 0.7, marginTop: '5px', textAlign: 'right', margin: 0, fontFamily: 'inherit' }}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
    </div>
  );

  const QuickActions = () => (
    <div style={{ padding: '12px', borderTop: '1px solid #f0f0f0', backgroundColor: '#fafafa' }}>
      <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px', fontFamily: 'inherit' }}>Quick actions:</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {['Show products', 'Shipping info', 'Return policy', 'Product care'].map((action) => (
          <button key={action} style={{ fontSize: '12px', backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '16px', padding: '6px 12px', cursor: 'pointer', fontFamily: 'inherit' }} onClick={() => handleQuickActionClick(action)}>
            {action}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: 'inherit' }}>
      <div ref={chatContainerRef} style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        {messages.map((message) => <MessageBubble key={message.id} message={message} />)}
        {isLoading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, backgroundColor: '#a855f7' }}>
                <Bot style={{ width: '16px', height: '16px', color: 'white' }} />
              </div>
              <div style={{ borderRadius: '12px', padding: '12px', backgroundColor: '#f3f4f6' }}>
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  <div style={{ width: '8px', height: '8px', backgroundColor: '#9ca3af', borderRadius: '50%', animation: 'bounce 1.4s infinite' }}></div>
                  <div style={{ width: '8px', height: '8px', backgroundColor: '#9ca3af', borderRadius: '50%', animation: 'bounce 1.4s infinite 0.2s' }}></div>
                  <div style={{ width: '8px', height: '8px', backgroundColor: '#9ca3af', borderRadius: '50%', animation: 'bounce 1.4s infinite 0.4s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <QuickActions />
      <div style={{ padding: '12px', borderTop: '1px solid #f0f0f0', backgroundColor: 'white' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            style={{ flex: 1, border: '1px solid #ddd', borderRadius: '8px', padding: '10px', fontSize: '14px', fontFamily: 'inherit' }}
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isLoading}
            style={{ backgroundColor: '#ff4d6d', color: 'white', border: 'none', borderRadius: '8px', padding: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Send style={{ width: '16px', height: '16px' }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;
