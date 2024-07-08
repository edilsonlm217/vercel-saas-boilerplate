import React from 'react';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import clsx from 'clsx';

import { Message, Sender } from '../types/message.types';

type MessageItemProps = {
  message: Message;
};

const MessageItem: React.FC<MessageItemProps> = ({ message }) => (
  <div
    className={clsx(
      'mb-2 p-2 rounded-lg max-w-[75%]',
      {
        'text-white bg-gray-900 self-end ml-auto': message.sender === Sender.User,
        'text-white bg-gray-950 self-start': message.sender === Sender.Bot,
      },
      'whitespace-pre-wrap break-words'
    )}
  >
    {message.sender === 'bot' ? (
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {message.text}
      </ReactMarkdown>
    ) : (
      message.text
    )}
  </div>
);

export default MessageItem;
