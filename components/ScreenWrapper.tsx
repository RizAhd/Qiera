// components/ScreenWrapper.tsx
import { useChatBot } from "@/context/ChatBotContext";
import React, { useEffect } from "react";

interface ScreenWrapperProps {
  children: React.ReactNode;
  hideChatBot?: boolean;
  showChatBot?: boolean;
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ 
  children, 
  hideChatBot = false,
  showChatBot = false 
}) => {
  const { setChatBotVisibility } = useChatBot();

  useEffect(() => {
    if (hideChatBot) {
      setChatBotVisibility(false);
    } else if (showChatBot) {
      setChatBotVisibility(true);
    }

    // Cleanup: restore default visibility
    return () => {
      setChatBotVisibility(true);
    };
  }, [hideChatBot, showChatBot, setChatBotVisibility]);

  return <>{children}</>;
};

export default ScreenWrapper;