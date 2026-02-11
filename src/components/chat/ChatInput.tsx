import React, { useState, useRef, useEffect } from 'react';

interface Props {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

const ChatInput: React.FC<Props> = ({
  onSend,
  disabled = false,
  placeholder = 'Ask me anything about your resume or job application...',
}) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [message]);

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-slate-200 p-4 bg-white">
      <div className="flex items-end gap-2">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 resize-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          rows={1}
          style={{ minHeight: '44px', maxHeight: '150px' }}
        />
        <button
          onClick={handleSend}
          disabled={disabled || !message.trim()}
          className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
            disabled || !message.trim()
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 active:scale-95'
          }`}
          aria-label="Send message"
        >
          {disabled ? (
            <i className="fas fa-circle-notch fa-spin text-sm"></i>
          ) : (
            <i className="fas fa-paper-plane text-sm"></i>
          )}
        </button>
      </div>
      <p className="text-xs text-slate-400 mt-2">
        Press <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-xs">Enter</kbd> to send,{' '}
        <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-xs">Shift + Enter</kbd> for new line
      </p>
    </div>
  );
};

export default ChatInput;
