import React, { useEffect, useRef, useState } from 'react';
import MessageItem from './MessageItem';

import { Message } from '../types/message.types';
import { ArrowDown } from 'lucide-react';

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  const handleScroll = () => {
    if (messagesContainerRef.current) {
      const { scrollTop } = messagesContainerRef.current;
      console.log(messagesContainerRef.current.scrollTop);
      const isAtBottom = scrollTop >= -10;
      setShowScrollButton(!isAtBottom);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  return (
    <>
      <div ref={messagesContainerRef} className="flex-grow overflow-y-auto px-4 xl:px-0 py-4 md:py-4 bg-black-900 flex flex-col-reverse">
        {messages.slice(0).reverse().map((msg, index) => (
          <MessageItem key={index} message={msg} />
        ))}
      </div>
      {showScrollButton && (
        <button
          className="absolute bottom-[6rem] left-1/2 transform -translate-x-1/2 bg-gray-500 hover:bg-gray-400 text-white rounded-full p-2 shadow-md"
          onClick={scrollToBottom}
        >
          <ArrowDown className="h-4 w-4" />
        </button>
      )}
    </>
  );
};

export default MessageList;
