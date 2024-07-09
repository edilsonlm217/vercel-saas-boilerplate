import React, { useRef, useEffect } from 'react';

const ResizableTextarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
  ...restProps
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const adjustTextareaHeight = () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;

        if (textareaRef.current.scrollHeight > 160) {
          textareaRef.current.style.height = `160px`;
          textareaRef.current.style.overflowY = 'scroll';
        } else {
          textareaRef.current.style.overflowY = 'hidden';
        }
      }
    };

    adjustTextareaHeight();
  }, [restProps.value]);

  return (
    <textarea
      {...restProps}
      ref={textareaRef}
      rows={1}
    />
  );
};

export default ResizableTextarea;
