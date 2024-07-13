'use client';

import React, { useState } from 'react';
import MessageList from './components/MessageList';
import useChat from './hooks/useChat';
import ResizableTextarea from './components/ResizableTextarea';
import { Button } from '@/components/shadcn/ui/button';
import { Send, Square } from 'lucide-react';

const ChatPage: React.FC = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const {
    messages,
    message,
    handleInput,
    handleKeyDown,
    sendMessage,
  } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  const handleStop = () => {
    setIsStreaming(false);
    console.log('Streaming stopped');
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
            className="min-h-auto max-h-160 overflow-hidden bg-zinc-950 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
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
