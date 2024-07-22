import { useState, useCallback } from 'react';
import useMessageManager from './useMessageManager';
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
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamReader, setStreamReader] = useState<ReadableStreamDefaultReader | null>(null);

  const handleApiCall = useCallback(async (trimmedMessage: string) => {
    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: trimmedMessage, threadId: '9617cd52-db27-4055-84e6-fcda23c26d2c' }),
      });

      const reader = response.body?.getReader();
      if (reader) {
        setStreamReader(reader);
        const decoder = new TextDecoder();
        let result = '';

        // Add the initial message for the bot
        addMessage('', Sender.Bot);

        const processText = async ({ done, value }: ReadableStreamReadResult<Uint8Array>) => {
          if (done) {
            setIsStreaming(false);
            return;
          }

          const chunk = decoder.decode(value, { stream: true });
          result += chunk;

          // Update the last message with the streaming result
          updateLastMessage(result);

          reader.read().then(processText);
        };

        reader.read().then(processText);
      } else {
        setIsStreaming(false);
      }
    } catch (error) {
      console.error('Error sending message to agent:', error);
      setIsStreaming(false);
    }
  }, [addMessage, updateLastMessage]);

  const sendMessage = useCallback(() => {
    const trimmedMessage = message.trim();
    if (trimmedMessage) {
      addMessage(trimmedMessage, Sender.User); // Add the user message
      setMessage('');
      setIsStreaming(true);
      handleApiCall(trimmedMessage);
    }
  }, [message, addMessage, handleApiCall]);

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

  const handleStop = useCallback(() => {
    if (streamReader) {
      streamReader.cancel();
    }
    setIsStreaming(false);
    console.log('Streaming stopped');
  }, [streamReader]);

  const isMessageEmpty = message.trim().length === 0;

  return {
    messages,
    message,
    handleInput,
    handleKeyDown,
    sendMessage,
    isMessageEmpty,
    isStreaming,
    handleStop,
  };
};

export default useChat;
