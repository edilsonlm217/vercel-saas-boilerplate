import { useState } from 'react';
import { Message } from '../types/message.types';
import { Sender } from '../types/sender.enum';

type UseMessageManagerReturn = {
  messages: Message[];
  addMessage: (message: string, sender: Sender) => void;
  updateLastMessage: (newText: string) => void;
};

const useMessageManager = (): UseMessageManagerReturn => {
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = (message: string, sender: Sender) => {
    setMessages(prevMessages => [...prevMessages, { text: message, sender }]);
  };

  const updateLastMessage = (newText: string) => {
    setMessages(prevMessages => {
      if (prevMessages.length === 0) return prevMessages;

      const updatedMessages = [...prevMessages];
      updatedMessages[updatedMessages.length - 1] = {
        ...updatedMessages[updatedMessages.length - 1],
        text: newText,
      };

      return updatedMessages;
    });
  };

  return { messages, addMessage, updateLastMessage };
};

export default useMessageManager;
