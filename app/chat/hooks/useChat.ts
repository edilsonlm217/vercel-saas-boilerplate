import { useState, useCallback } from 'react';
import useMessageManager from '../hooks/useMessageManager';
import { Sender } from '../types/sender.enum';

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
 */
const useChat = () => {
  const { messages, addMessage } = useMessageManager();
  const [message, setMessage] = useState('');

  /**
   * Sends the current message if it is not empty.
   */
  const sendMessage = useCallback(() => {
    const trimmedMessage = message.trim();
    if (trimmedMessage) {
      addMessage(trimmedMessage, Sender.User);
      setMessage('');
    }
  }, [message, addMessage]);

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
      sendMessage();
    }
  }, [sendMessage]);

  const isMessageEmpty = message.trim().length === 0;

  return {
    messages,
    message,
    handleInput,
    handleKeyDown,
    sendMessage,
    isMessageEmpty,
  };
};

export default useChat;
