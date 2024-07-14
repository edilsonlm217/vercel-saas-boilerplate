import { useState, useCallback } from 'react';

import useMessageManager from '../hooks/useMessageManager';
import useAgentExecutor from './useAgentExecutor';

import { Sender } from '../types/sender.enum';
import { ChatHook } from '../types/chat.hook.interface';

const useChat = (): ChatHook => {
  const { messages, addMessage } = useMessageManager();
  const [message, setMessage] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const { sendMessage: sendAgentMessage } = useAgentExecutor();

  const sendMessage = useCallback(() => {
    const trimmedMessage = message.trim();
    if (trimmedMessage) {
      addMessage(trimmedMessage, Sender.User);
      setMessage('');
      setIsStreaming(true);
      sendAgentMessage(trimmedMessage)
        .then(agentResponse => {
          addMessage(agentResponse, Sender.Bot);
        })
        .catch(error => {
          console.error('Error sending message to agent:', error);
        })
        .finally(() => {
          setIsStreaming(false);
        });
    }
  }, [message, addMessage, sendAgentMessage]);

  const handleInput = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isStreaming) {
        sendMessage();
      } else {
        setMessage((prevMessage) => prevMessage + '\n');
      }
    }
  }, [sendMessage, isStreaming]);

  const handleStop = useCallback(() => {
    setIsStreaming(false);
    console.log('Streaming stopped');
  }, []);

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
