import React, { createContext, useContext, useState, useCallback } from 'react';
import { chatService, ChatMessage, ChatContext } from '../services/chatService';
import { v4 as uuidv4 } from 'uuid';

interface CopilotContextType {
  messages: ChatMessage[];
  isOpen: boolean;
  isLoading: boolean;
  sessionId: string;
  sendMessage: (message: string) => Promise<void>;
  openChat: () => void;
  closeChat: () => void;
  clearMessages: () => void;
  setContext: (context: ChatContext) => void;
  context: ChatContext | null;
}

const CopilotContext = createContext<CopilotContextType | undefined>(undefined);

interface Props {
  children: React.ReactNode;
  pageContext: string;
  pageTitle: string;
}

export const CopilotProvider: React.FC<Props> = ({ children, pageContext, pageTitle }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => uuidv4());
  const [context, setContext] = useState<ChatContext | null>(null);
  const [currentAssistantMessage, setCurrentAssistantMessage] = useState('');

  const sendMessage = useCallback(async (message: string) => {
    if (!context) {
      console.error('Context not set');
      return;
    }

    const userMessage: ChatMessage = {
      role: 'user',
      content: message,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setCurrentAssistantMessage('');

    const request = {
      message,
      page_context: pageContext,
      context_data: context,
      session_id: sessionId,
    };

    try {
      await chatService.sendMessage(
        request,
        (chunk: string) => {
          setCurrentAssistantMessage(prev => prev + chunk);
        },
        () => {
          if (currentAssistantMessage.trim()) {
            const assistantMessage: ChatMessage = {
              role: 'assistant',
              content: currentAssistantMessage.trim(),
              timestamp: new Date(),
            };
            setMessages(prev => [...prev, assistantMessage]);
          }
          setCurrentAssistantMessage('');
          setIsLoading(false);
        },
        (error: string) => {
          const errorMessage: ChatMessage = {
            role: 'assistant',
            content: `I apologize, but I encountered an error: ${error}`,
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, errorMessage]);
          setCurrentAssistantMessage('');
          setIsLoading(false);
        }
      );

      if (currentAssistantMessage.trim()) {
        const assistantMessage: ChatMessage = {
          role: 'assistant',
          content: currentAssistantMessage.trim(),
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, assistantMessage]);
        setCurrentAssistantMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: 'I apologize, but I encountered an error while processing your message.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
    }
  }, [context, pageContext, sessionId, currentAssistantMessage]);

  const openChat = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setCurrentAssistantMessage('');
    chatService.clearHistory(sessionId);
  }, [sessionId]);

  const displayMessages = [...messages];
  if (currentAssistantMessage.trim() && isLoading) {
    displayMessages.push({
      role: 'assistant',
      content: currentAssistantMessage,
      timestamp: new Date(),
    });
  }

  return (
    <CopilotContext.Provider
      value={{
        messages: displayMessages,
        isOpen,
        isLoading,
        sessionId,
        sendMessage,
        openChat,
        closeChat,
        clearMessages,
        setContext,
        context,
      }}
    >
      {children}
    </CopilotContext.Provider>
  );
};

export const useCopilot = () => {
  const context = useContext(CopilotContext);
  if (!context) {
    throw new Error('useCopilot must be used within a CopilotProvider');
  }
  return context;
};
