'use client';

import { Button } from '@/components/shadcn/ui/button';

import { Send, Square } from 'lucide-react';

import ChatContainer from './components/ChatConatiner';
import ChatForm from './components/ChatForm';
import MessageList from './components/MessageList';
import ResizableTextarea from './components/ResizableTextarea';

import clsx from 'clsx';

import useChat from './hooks/useChat';

const ChatPage: React.FC = () => {
  const {
    messages,
    message,
    handleInput,
    handleKeyDown,
    sendMessage,
    isMessageEmpty,
    isStreaming,
    handleStop,
  } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <ChatContainer>
      <MessageList messages={messages} />
      <ChatForm handleSubmit={handleSubmit}>
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
            className={clsx(
              'text-white',
              {
                'bg-gray-600': isMessageEmpty && !isStreaming,
                'bg-gray-500 hover:bg-gray-400': !isMessageEmpty || isStreaming
              }
            )}
            disabled={isMessageEmpty && !isStreaming}
            onClick={isStreaming ? handleStop : undefined}
          >
            {isStreaming ? <Square className="h-4 w-4" /> : <Send className="h-4 w-4" />}
          </Button>

        </div>
      </ChatForm>
    </ChatContainer>
  );
};

export default ChatPage;
