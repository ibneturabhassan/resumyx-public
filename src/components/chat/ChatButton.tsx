import React from 'react';

interface Props {
  onClick: () => void;
  unreadCount?: number;
  isOpen: boolean;
}

const ChatButton: React.FC<Props> = ({ onClick, unreadCount = 0, isOpen }) => {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg transition-all duration-300 z-50 flex items-center justify-center ${
        isOpen
          ? 'bg-slate-700 hover:bg-slate-800'
          : 'bg-blue-600 hover:bg-blue-700 hover:scale-110'
      }`}
      aria-label="Open chat assistant"
    >
      {isOpen ? (
        <i className="fas fa-times text-white text-lg"></i>
      ) : (
        <>
          <i className="fas fa-comment text-white text-lg"></i>
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </>
      )}
    </button>
  );
};

export default ChatButton;
