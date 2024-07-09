import React, { useRef, useEffect } from 'react';

interface ResizableTextareaProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  maxHeight?: number;
}

const ResizableTextarea: React.FC<ResizableTextareaProps> = ({
  value,
  onChange,
  onKeyDown,
  placeholder,
  maxHeight = 160,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;

      if (textareaRef.current.scrollHeight > maxHeight) {
        textareaRef.current.style.height = `${maxHeight}px`;
        textareaRef.current.style.overflowY = 'scroll';
      } else {
        textareaRef.current.style.overflowY = 'hidden';
      }
    }
  }, [value, maxHeight]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={handleInput}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      rows={1}
      className="w-full px-3 py-2 rounded-lg bg-zinc-950 text-white focus:outline-none focus:ring-2 focus:ring-gray-500 resize-none"
      style={{ minHeight: 'auto', maxHeight: `${maxHeight}px`, overflow: 'hidden' }}
    />
  );
};

export default ResizableTextarea;
