import React, { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  messages: Message[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  pageTitle: string;
}

const ChatPanel: React.FC<Props> = ({
  isOpen,
  onClose,
  messages,
  onSendMessage,
  isLoading,
  pageTitle,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
        onClick={onClose}
      />

      {/* Chat Panel */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } w-full lg:w-[400px]`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <i className="fas fa-robot text-white text-sm"></i>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Resume Assistant</h3>
              <p className="text-xs text-slate-300">{pageTitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
            aria-label="Close chat"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Messages */}
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50"
        >
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center px-8">
                <div className="w-16 h-16 rounded-full bg-blue-100 mx-auto mb-4 flex items-center justify-center">
                  <i className="fas fa-comments text-2xl text-blue-600"></i>
                </div>
                <h4 className="text-lg font-semibold text-slate-700 mb-2">
                  Hello! I'm your resume assistant
                </h4>
                <p className="text-sm text-slate-500">
                  Ask me anything about improving your resume, cover letter, or job application for this specific role.
                </p>
                <div className="mt-6 space-y-2">
                  <button
                    onClick={() => onSendMessage("How can I improve my resume for this job?")}
                    className="block w-full text-left px-4 py-2 bg-white rounded-lg hover:bg-blue-50 border border-slate-200 hover:border-blue-300 transition-colors text-sm text-slate-700"
                  >
                    <i className="fas fa-lightbulb text-blue-600 mr-2"></i>
                    How can I improve my resume?
                  </button>
                  <button
                    onClick={() => onSendMessage("What keywords am I missing?")}
                    className="block w-full text-left px-4 py-2 bg-white rounded-lg hover:bg-blue-50 border border-slate-200 hover:border-blue-300 transition-colors text-sm text-slate-700"
                  >
                    <i className="fas fa-search text-blue-600 mr-2"></i>
                    What keywords am I missing?
                  </button>
                  <button
                    onClick={() => onSendMessage("Help me write a better summary")}
                    className="block w-full text-left px-4 py-2 bg-white rounded-lg hover:bg-blue-50 border border-slate-200 hover:border-blue-300 transition-colors text-sm text-slate-700"
                  >
                    <i className="fas fa-pen text-blue-600 mr-2"></i>
                    Help me write a better summary
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message, index) => (
                <ChatMessage
                  key={index}
                  role={message.role}
                  content={message.content}
                  timestamp={message.timestamp}
                />
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input */}
        <ChatInput
          onSend={onSendMessage}
          disabled={isLoading}
          placeholder="Ask me anything..."
        />
      </div>
    </>
  );
};

export default ChatPanel;
