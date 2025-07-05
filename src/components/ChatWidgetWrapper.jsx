import { useState } from 'react';
import ChatWidget from './ChatWidget';
import { MessageCircle, X } from 'lucide-react';

const ChatWidgetWrapper = ({ backendUrl }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // This main container lives inside the shadow DOM
    <div>
      {/* Floating chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-5 w-[370px] h-[600px] bg-white border border-gray-300 shadow-2xl rounded-xl flex flex-col z-[9999]">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b bg-gray-50 rounded-t-xl">
            <h3 className="font-bold text-gray-800">Feelori Assistant</h3>
            <button onClick={() => setIsOpen(false)} aria-label="Close Chat" className="p-1 hover:bg-gray-200 rounded-full">
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto min-h-0">
            <ChatWidget backendUrl={backendUrl} />
          </div>
        </div>
      )}

      {/* Floating chat bubble */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 bg-[#ff4d6d] hover:bg-[#e6395b] text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center z-[9999] transition-transform hover:scale-110"
          aria-label="Open Chat"
        >
          <MessageCircle className="w-8 h-8" />
        </button>
      )}
    </div>
  );
};

export default ChatWidgetWrapper;