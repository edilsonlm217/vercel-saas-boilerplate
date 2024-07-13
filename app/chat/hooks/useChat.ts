import { useState, useCallback } from 'react';
import useMessageManager from '../hooks/useMessageManager';
import { Sender } from '../types/sender.enum';

const useChat = () => {
  const { messages, addMessage } = useMessageManager();
  const [message, setMessage] = useState('');

  const sendMessage = useCallback(() => {
    if (message.trim()) {
      addMessage(message, Sender.User);
      setMessage('');
    }
  }, [message, addMessage]);

  const handleInput = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }, [sendMessage]);

  return {
    messages,
    message,
    handleInput,
    handleKeyDown,
    sendMessage,
  };
};

export default useChat;
