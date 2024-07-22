import React, { useRef } from 'react';
import useScrollToBottom from '@/hooks/useScrollToBottom';
import ScrollButton from '@/components/ui/ScrollButton';
import ChatMessage from "@/components/ui/ChatComponents/ChatMessage";
import { Message } from '@/types/message.types';

interface ChatMessageListProps {
  messages: Message[];
}

const ChatMessageList: React.FC<ChatMessageListProps> = ({ messages }) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const { showScrollButton, scrollToBottomClick } = useScrollToBottom(messagesContainerRef, messages);

  return (
    <>
      <div ref={messagesContainerRef} className="flex-grow overflow-y-auto px-4 xl:px-0 py-4 md:py-4 bg-black-900 flex flex-col"      >
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
      </div>
      {showScrollButton && (
        <ScrollButton
          className="absolute bottom-[6rem] left-1/2 transform -translate-x-1/2 bg-gray-500 hover:bg-gray-400 text-white rounded-full p-2 shadow-md"
          onClick={scrollToBottomClick}
        />
      )}
    </>
  );
};

export default ChatMessageList;
