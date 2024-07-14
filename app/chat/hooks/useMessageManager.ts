import { useState } from 'react';
import { Message } from '../types/message.types';
import { Sender } from '../types/sender.enum';

type UseMessageManagerReturn = {
  messages: Message[];
  addMessage: (message: string, sender: Sender) => void;
};

const useMessageManager = (): UseMessageManagerReturn => {
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = (message: string, sender: Sender) => {
    setMessages(prevMessages => [...prevMessages, { text: message, sender }]);
  };

  return { messages, addMessage };
};

export default useMessageManager;
