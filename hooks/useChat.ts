import { useState, useCallback } from 'react';

import useMessageManager from '@/hooks/useMessageManager';
import useStreaming from '@/hooks/useStreaming';
import useFetch from '@/hooks/useFetch';

import { Sender } from '@/types/sender.enum';
import { Message } from '@/types/message.types';

export interface ChatHook {
  messages: Message[];
  message: string;
  handleInput: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  sendMessage: () => void;
  isMessageEmpty: boolean;
  isStreaming: boolean;
  handleStop: () => void;
}

const useChat = (): ChatHook => {
  const { messages, addMessage, updateLastMessage } = useMessageManager();
  const [message, setMessage] = useState('');

  const { fetchData } = useFetch<ReadableStream>();

  const handleApiCall = useCallback((query: string) => {
    return fetchData('/api/assistant', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, threadId: '9617cd52-db27-4055-84e6-fcda23c26d2c' }),
    });
  }, [fetchData]);

  const { isStreaming, startStreaming, stopStreaming } = useStreaming(
    (message: string) => updateLastMessage(message),
    () => addMessage('', Sender.Bot)
  );

  const sendMessage = useCallback(() => {
    const trimmedMessage = message.trim();
    if (trimmedMessage) {
      addMessage(trimmedMessage, Sender.User); // Add the user message
      setMessage('');
      startStreaming(() => handleApiCall(trimmedMessage));
    }
  }, [message, addMessage, startStreaming, handleApiCall]);

  const handleInput = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isStreaming) {
        sendMessage();
      } else {
        setMessage(prevMessage => prevMessage + '\n');
      }
    }
  }, [sendMessage, isStreaming]);

  const isMessageEmpty = message.trim().length === 0;

  return {
    messages,
    message,
    handleInput,
    handleKeyDown,
    sendMessage,
    isMessageEmpty,
    isStreaming,
    handleStop: stopStreaming,
  };
};

export default useChat;
