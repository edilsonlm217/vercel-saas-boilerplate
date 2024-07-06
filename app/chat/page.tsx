'use client';

import { Button } from '@/components/shadcn/ui/button';
import Input from '@/components/ui/Input';
import { Send } from 'lucide-react';
import React, { useState } from 'react';

const ChatPage: React.FC = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      console.log('Mensagem enviada:', message);
      setMessage('');
    }
  };

  return (
    <form className="flex items-center gap-2 p-4 bg-gray-800" onSubmit={handleSubmit}>
      <div className="flex-grow">
        <Input
          type="text"
          value={message}
          onChange={(value) => setMessage(value)}
          placeholder="Digite sua mensagem..."
          className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
      </div>
      <Button
        type="submit"
        variant="default"
        size="icon"
        className={`${
          !message.trim() ? 'bg-gray-600' : 'bg-gray-500 hover:bg-gray-400'
        } text-white`}
        disabled={!message.trim()}
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default ChatPage;
