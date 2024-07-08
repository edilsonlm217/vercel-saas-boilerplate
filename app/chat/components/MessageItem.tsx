import React from 'react';
import clsx from 'clsx';

import { Message } from '../types/message.types';

type MessageItemProps = {
  message: Message;
};

const MessageItem: React.FC<MessageItemProps> = ({ message }) => (
  <div
    className={clsx(
      'mb-2 p-2 rounded-lg max-w-[75%]',
      {
        'text-white bg-gray-900 self-end ml-auto': message.sender === 'user',
        'text-white bg-gray-950 self-start': message.sender !== 'user',
      },
      'whitespace-pre-wrap break-words'
    )}
  >
    {message.text}
  </div>
);

export default MessageItem;
