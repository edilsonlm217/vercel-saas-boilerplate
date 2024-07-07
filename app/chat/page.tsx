'use client';

import { Button } from '@/components/shadcn/ui/button';
import { Send, Square } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

const ChatPage: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      console.log('Mensagem enviada:', message);
      setMessage('');
      setIsStreaming(true);
      // Simulate streaming for 5 seconds
      setTimeout(() => {
        setIsStreaming(false);
      }, 5000);
    }
  };

  const handleStop = () => {
    setIsStreaming(false);
    console.log('Streaming stopped');
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  return (
    <form className="flex items-center gap-2 p-4 bg-gray-800" onSubmit={handleSubmit}>
      <div className="flex-grow flex items-center">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleInput}
          placeholder="Digite sua mensagem..."
          rows={1}
          className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500 resize-none"
          style={{ minHeight: 'auto', overflow: 'hidden' }}
        />
      </div>
      <Button
        type="submit"
        variant="default"
        size="icon"
        className={`${!message.trim() && !isStreaming ? 'bg-gray-600' : 'bg-gray-500 hover:bg-gray-400'
          } text-white`}
        disabled={!message.trim() && !isStreaming}
        onClick={isStreaming ? handleStop : undefined}
      >
        {isStreaming ? <Square className="h-4 w-4" /> : <Send className="h-4 w-4" />}
      </Button>
    </form>
  );
};

export default ChatPage;
