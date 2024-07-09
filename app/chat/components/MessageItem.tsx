import React from 'react';
import clsx from 'clsx';

import MarkdownMessage from './MarkdownMessage';

import { Message } from '../types/message.types';
import { Sender } from '../types/sender.enum';

type MessageItemProps = {
  message: Message;
};

const MessageItem: React.FC<MessageItemProps> = ({ message }) => (
  <div
    className={clsx(
      'mb-2 p-2 rounded-lg',
      {
        'text-white bg-gray-900 self-end ml-auto max-w-[75%]': message.sender === Sender.User,
        'self-start w-full': message.sender === Sender.Bot,
      },
      'whitespace-pre-wrap break-words'
    )}
  >
    {message.sender === Sender.Bot ? (
      <MarkdownMessage text={message.text} />
    ) : (
      message.text
    )}
  </div>
);

export default MessageItem;
