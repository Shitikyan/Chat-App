import React, { createContext, useContext } from 'react';
import { IChatContainerService } from '../types';
import ChatContainerService from './chatContainer.services';

const ChatContainerContext = createContext<IChatContainerService | undefined>(
  undefined,
);

interface ChatContainerProviderProps {
  children: React.ReactNode;
}

export const ChatContainerProvider: React.FC<ChatContainerProviderProps> = ({
  children,
}) => {
  const chatContainerService = new ChatContainerService();

  return (
    <ChatContainerContext.Provider value={chatContainerService}>
      {children}
    </ChatContainerContext.Provider>
  );
};

export const useChatContainer = () => {
  const context = useContext(ChatContainerContext);
  if (!context) {
    throw new Error(
      'useChatContainer must be used within an ChatContainerProvider',
    );
  }
  return context;
};
