import { useState, useCallback } from 'react';

import useMessageManager from '../hooks/useMessageManager';
import useAgentExecutor from './useAgentExecutor';

import { Sender } from '../types/sender.enum';
import { Message } from '../types/message.types';

interface ChatHook {
  messages: Message[];
  message: string;
  handleInput: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  sendMessage: () => void;
  isMessageEmpty: boolean;
  isStreaming: boolean;
  handleStop: () => void;
}

/**
 * Custom hook for chat functionality.
 * 
 * @returns {Object} Hook returns the chat state and handlers.
 * @property {Array} messages - List of messages.
 * @property {string} message - Current message input value.
 * @property {function} handleInput - Handler for input change event.
 * @property {function} handleKeyDown - Handler for key down event.
 * @property {function} sendMessage - Function to send the current message.
 * @property {boolean} isMessageEmpty - Boolean indicating if the current message is empty after trimming.
 * @property {boolean} isStreaming - Boolean indicating if the message is being streamed.
 * @property {function} handleStop - Function to stop streaming.
 */
const useChat = (): ChatHook => {
  const { messages, addMessage } = useMessageManager();
  const [message, setMessage] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const { sendMessage: sendAgentMessage } = useAgentExecutor();

  /**
   * Sends the current message if it is not empty.
   */
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

  /**
   * Handler for input change event.
   * @param {React.ChangeEvent<HTMLTextAreaElement>} e - The change event.
   */
  const handleInput = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  }, []);

  /**
   * Handler for key down event.
   * @param {React.KeyboardEvent<HTMLTextAreaElement>} e - The key down event.
   */
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
