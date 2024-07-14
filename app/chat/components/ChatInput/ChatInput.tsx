import ResizableTextarea from "@/components/ui/ResizableTextarea";

const ChatInput: React.FC<{
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}> = ({ value, onChange, onKeyDown }) => (
  <div className="flex-grow flex items-center">
    <ResizableTextarea
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder="Digite sua mensagem..."
      className="min-h-auto max-h-160 overflow-hidden bg-zinc-950 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
    />
  </div>
);

export default ChatInput