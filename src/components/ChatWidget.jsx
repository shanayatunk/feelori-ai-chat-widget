import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Send, User, Bot, ShoppingCart, ExternalLink } from 'lucide-react';

// The component now only contains the conversation logic
const ChatWidget = ({ backendUrl }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! Welcome to Feelori! I\'m here to help you find the perfect products for comfort and wellness. What can I assist you with today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const apiUrl = `${backendUrl}/api/chat`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputMessage, history: messages })
      });

      if (!response.ok) throw new Error(`Server responded with status: ${response.status}`);
      
      const data = await response.json();

      if (data.success) {
        const botMessage = {
          id: Date.now() + 1,
          type: 'bot',
          content: data.response.message,
          responseType: data.response.type,
          product: data.response.product,
          products: data.response.products,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: 'Sorry, I\'m having trouble responding right now. Please try again in a moment.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const ProductCard = ({ product }) => (
    <Card className="mt-2 max-w-sm bg-white">
      <CardContent className="p-3">
        <div className="flex items-start space-x-3">
          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
            <ShoppingCart className="w-6 h-6 text-gray-500" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-sm">{product.title || product.name}</h4>
            <div className="flex items-center justify-between mt-2">
              <span className="font-bold text-sm text-green-600">${product.price}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const ProductList = ({ products }) => (
    <div className="mt-2 space-y-2">
      {products?.slice(0, 3).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );

  const MessageBubble = ({ message }) => (
    <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex items-start space-x-2 max-w-[90%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          message.type === 'user' ? 'bg-blue-500' : 'bg-purple-500'
        }`}>
          {message.type === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
        </div>
        <div className={`rounded-lg p-3 ${
          message.type === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'
        }`}>
          <p className="text-sm">{message.content}</p>
          {message.product && <ProductCard product={message.product} />}
          {message.products && <ProductList products={message.products} />}
          <p className="text-xs opacity-70 mt-1 text-right">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
    </div>
  );

  const QuickActions = () => (
    <div className="p-3 border-t bg-gray-50">
      <p className="text-xs text-gray-600 mb-2">Quick actions:</p>
      <div className="flex flex-wrap gap-2">
        {['Show products', 'Shipping info', 'Return policy', 'Product care'].map((action) => (
          <Button
            key={action}
            variant="outline"
            size="sm"
            className="text-xs bg-white"
            onClick={() => {
              setInputMessage(action);
              setTimeout(sendMessage, 100);
            }}
          >
            {action}
          </Button>
        ))}
      </div>
    </div>
  );

  // The return statement is now just the conversation area
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Input Area */}
      <div className="p-3 border-t bg-white">
        <div className="flex space-x-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;