import React from 'react';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';

import styles from '@/styles/markdown.module.css';

type BotMessageProps = {
  text: string;
};

const BotMessage: React.FC<BotMessageProps> = ({ text }) => (
  <div className='whitespace-pre-wrap break-words mb-2 p-2 rounded-lg self-start w-full'>
    <ReactMarkdown className={styles.markdownBody} remarkPlugins={[remarkGfm]}>
      {text}
    </ReactMarkdown>
  </div >
);

export default BotMessage;
