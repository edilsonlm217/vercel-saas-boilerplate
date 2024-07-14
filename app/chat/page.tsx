'use client';

import useChat from './hooks/useChat';

import {
  ChatForm,
  ChatInput,
  ChatContainer,
  ChatMessageList,
  ChatSubmitButton
} from './components';

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
      <ChatMessageList messages={messages} />
      <ChatForm onSubmit={handleSubmit}>
        <ChatInput
          value={message}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
        />
        <ChatSubmitButton
          isMessageEmpty={isMessageEmpty}
          isStreaming={isStreaming}
          sendMessage={sendMessage}
          handleStop={handleStop}
        />
      </ChatForm>
    </ChatContainer>
  );
};

export default ChatPage;
