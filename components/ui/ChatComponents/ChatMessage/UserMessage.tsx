import clsx from 'clsx';

type UserMessageProps = {
  text: string;
};

const UserMessage: React.FC<UserMessageProps> = ({ text }) => (
  <div
    className={clsx(
      'whitespace-pre-wrap break-words mb-2 p-2 rounded-lg text-white bg-gray-900',
      'self-end ml-auto max-w-[75%]'
    )}
  >
    {text}
  </div>
);

export default UserMessage;
