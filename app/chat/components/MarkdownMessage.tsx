import React from 'react';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';

import styles from './MarkdownMessage.module.css';

type MarkdownMessageProps = {
  text: string;
};

const MarkdownMessage: React.FC<MarkdownMessageProps> = ({ text }) => (
  <ReactMarkdown className={styles.markdownBody} remarkPlugins={[remarkGfm]}>
    {text}
  </ReactMarkdown>
);

export default MarkdownMessage;
