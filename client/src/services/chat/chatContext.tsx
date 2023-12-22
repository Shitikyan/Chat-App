import React, { createContext, useContext } from 'react';
import ChatService from './chat.service';
import { IChatService } from '../types';

export const ChatContext = createContext<IChatService | undefined>(undefined);

interface ChatProviderProps {
  children: React.ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const chatService = new ChatService();

  return (
    <ChatContext.Provider value={chatService}>{children}</ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within an ChatProvider');
  }
  return context;
};
