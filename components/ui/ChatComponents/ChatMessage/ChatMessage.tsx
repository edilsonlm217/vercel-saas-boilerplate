import React from 'react';

import UserMessage from './UserMessage';
import BotMessage from './BotMessage';

import { Message } from '@/types/message.types';
import { Sender } from '@/types/sender.enum';

type ChatMessageProps = {
  message: Message;
};

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => (
  <>
    {message.sender === Sender.Bot
      ? <BotMessage text={message.text} />
      : <UserMessage text={message.text} />
    }
  </>
);

export default ChatMessage;
