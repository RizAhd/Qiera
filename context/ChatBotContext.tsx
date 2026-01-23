// context/ChatBotContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface ChatBotContextType {
  isChatBotVisible: boolean;
  hideChatBot: () => void;
  showChatBot: () => void;
  setChatBotVisibility: (visible: boolean) => void;
}

const ChatBotContext = createContext<ChatBotContextType | undefined>(undefined);

export const ChatBotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isChatBotVisible, setIsChatBotVisible] = useState(true);

  return (
    <ChatBotContext.Provider
      value={{
        isChatBotVisible,
        hideChatBot: () => setIsChatBotVisible(false),
        showChatBot: () => setIsChatBotVisible(true),
        setChatBotVisibility: (visible) => setIsChatBotVisible(visible),
      }}
    >
      {children}
    </ChatBotContext.Provider>
  );
};

export const useChatBot = () => {
  const context = useContext(ChatBotContext);
  if (!context) {
    throw new Error('useChatBot must be used within ChatBotProvider');
  }
  return context;
};