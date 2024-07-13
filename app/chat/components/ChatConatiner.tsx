import React, { ReactNode } from 'react';

interface ChatContainerProps {
  children: ReactNode;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ children }) => {
  return (
    <div className="flex flex-col relative max-w-3xl mx-auto h-[calc(100vh-5rem)]">
      {children}
    </div>
  );
};

export default ChatContainer;
