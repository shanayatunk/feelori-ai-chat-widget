import { useState } from 'react';
import ChatWidget from './ChatWidget';
import { MessageCircle, X } from 'lucide-react';

// This wrapper will receive the backendUrl from the embed.jsx file
const ChatWidgetWrapper = ({ backendUrl }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Use a different color for the bubble to match your theme
  const bubbleColor = "bg-purple-600 hover:bg-purple-700";

  return (
    <>
      {/* Floating Chat Bubble */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`fixed bottom-6 right-6 ${bubbleColor} text-white p-4 rounded-full shadow-lg z-50`}
          aria-label="Open Chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 h-[500px] bg-white border shadow-xl rounded-lg flex flex-col z-50">
          <div className="flex justify-between items-center p-3 border-b bg-purple-50 rounded-t-lg">
            <span className="text-sm font-semibold text-gray-800">Feelori Assistant</span>
            <button onClick={() => setIsOpen(false)} aria-label="Close Chat">
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {/* The backendUrl is now passed down to the ChatWidget */}
            <ChatWidget backendUrl={backendUrl} />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidgetWrapper;