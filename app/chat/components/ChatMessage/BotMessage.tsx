import React from 'react';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';

import styles from '../MarkdownMessage.module.css';

type BotMessageProps = {
  text: string;
};

const BotMessage: React.FC<BotMessageProps> = ({ text }) => (
  <ReactMarkdown className={styles.markdownBody} remarkPlugins={[remarkGfm]}>
    {text}
  </ReactMarkdown>
);

export default BotMessage;
