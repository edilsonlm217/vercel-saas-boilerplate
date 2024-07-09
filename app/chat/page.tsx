'use client';

import React, { useState } from 'react';
import { Send, Square } from 'lucide-react';

import MessageList from './components/MessageList';
import { Button } from '@/components/shadcn/ui/button';
import ResizableTextarea from './components/ResizableTextarea';

import useMessageManager from './hooks/useMessageManager';

import { Sender } from './types/sender.enum';

const ChatPage: React.FC = () => {
  const { messages, addMessage } = useMessageManager();
  const [message, setMessage] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  const sendMessage = () => {
    if (message.trim()) {
      console.log('Mensagem enviada:', message);
      addMessage(message, Sender.User);
      setMessage('');
      setIsStreaming(true);
      // Simulate streaming for 5 seconds
      setTimeout(() => {
        setIsStreaming(false);
      }, 5000);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleStop = () => {
    setIsStreaming(false);
    console.log('Streaming stopped');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();

      if (!isStreaming) {
        sendMessage(); // Envia a mensagem apenas se não estiver em streaming
      } else {
        setMessage((prevMessage) => prevMessage + '\n'); // Quebra linha se estiver em streaming
      }
    }
  };

  return (
    <div className="flex flex-col relative max-w-3xl mx-auto" style={{ height: 'calc(100vh - 5rem)' }}>
      <MessageList messages={messages} />
      <form className="flex items-end gap-2 px-4 xl:px-0 py-4 md:py-4" onSubmit={handleSubmit}>
        <div className="flex-grow flex items-center">
          <ResizableTextarea
            value={message}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Digite sua mensagem..."
            className="resize-none min-h-auto max-h-160 overflow-hidden w-full px-3 py-2 rounded-lg bg-zinc-950 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>
        <div className="flex items-end">
          <Button
            type="submit"
            variant="default"
            size="icon"
            className={`${!message.trim() && !isStreaming ? 'bg-gray-600' : 'bg-gray-500 hover:bg-gray-400'} text-white`}
            disabled={!message.trim() && !isStreaming}
            onClick={isStreaming ? handleStop : undefined}
          >
            {isStreaming ? <Square className="h-4 w-4" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatPage;
