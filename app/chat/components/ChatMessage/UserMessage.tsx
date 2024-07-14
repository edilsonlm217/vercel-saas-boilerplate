import clsx from "clsx";

const UserMessage: React.FC<{ text: string }> = ({ text }) => (
  <div className={clsx('mb-2 p-2 rounded-lg text-white bg-gray-900 self-end ml-auto max-w-[75%]')}>
    {text}
  </div>
);

export default UserMessage