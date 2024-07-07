'use client';

import { Button } from '@/components/shadcn/ui/button';
import { Send, Square, ArrowDown } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

const ChatPage: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([
    { text: 'Olá, como posso ajudar?', sender: 'bot' },
    { text: 'Oi, gostaria de saber mais sobre os seus serviços.', sender: 'user' },
    { text: 'Claro, vou te enviar as informações agora.', sender: 'bot' },
    { text: 'Muito obrigado!', sender: 'user' },
  ]);
  const [isStreaming, setIsStreaming] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  const sendMessage = () => {
    if (message.trim()) {
      console.log('Mensagem enviada:', message);
      setMessages((prevMessages) => [...prevMessages, { text: message, sender: 'user' }]);
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
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;

      // Limitar altura máxima
      if (textareaRef.current.scrollHeight > 160) {
        textareaRef.current.style.height = '160px';
        textareaRef.current.style.overflowY = 'scroll';
      } else {
        textareaRef.current.style.overflowY = 'hidden';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Evita o comportamento padrão de enviar o formulário

      if (!isStreaming) {
        sendMessage(); // Envia a mensagem apenas se não estiver em streaming
      } else {
        setMessage((prevMessage) => prevMessage + '\n'); // Quebra linha se estiver em streaming
      }
    }
  };

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  return (
    <div className="flex flex-col relative" style={{ height: 'calc(100vh - 5rem)' }}>
      <div ref={messagesContainerRef} className="flex-grow overflow-y-auto p-4 bg-gray-900 flex flex-col-reverse">
        {messages.slice(0).reverse().map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded-lg text-white max-w-[75%] ${msg.sender === 'user' ? 'bg-blue-500 self-end ml-auto' : 'bg-gray-800 self-start'}`}
            style={{
              maxWidth: '75%',
              clear: 'both',
              whiteSpace: 'pre-wrap',
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <button
        className="absolute bottom-[6rem] left-1/2 transform -translate-x-1/2 bg-gray-500 hover:bg-gray-400 text-white rounded-full p-2 shadow-md"
        onClick={scrollToBottom}
      >
        <ArrowDown className="h-4 w-4" />
      </button>
      <form className="flex items-end gap-2 p-4 bg-gray-800" onSubmit={handleSubmit}>
        <div className="flex-grow flex items-center">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Digite sua mensagem..."
            rows={1}
            className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500 resize-none"
            style={{ minHeight: 'auto', maxHeight: '160px', overflow: 'hidden' }}
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
