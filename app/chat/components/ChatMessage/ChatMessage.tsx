import React from 'react';
import clsx from 'clsx';

import UserMessage from './UserMessage';
import BotMessage from './BotMessage';

import { Message } from '../../types/message.types';
import { Sender } from '../../types/sender.enum';

type ChatMessageProps = {
  message: Message;
};

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => (
  <div className={clsx('whitespace-pre-wrap break-words')}>
    {message.sender === Sender.Bot ? (
      <BotMessage text={message.text} />
    ) : (
      <UserMessage text={message.text} />
    )}
  </div>
);

export default ChatMessage;
