import React, { ReactNode, FormHTMLAttributes } from 'react';

interface ChatFormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
}

const ChatForm: React.FC<ChatFormProps> = ({ children, ...rest }) => {
  return (
    <form className="flex items-end gap-2 px-4 xl:px-0 py-4 md:py-4" {...rest}>
      {children}
    </form>
  );
};

export default ChatForm;
