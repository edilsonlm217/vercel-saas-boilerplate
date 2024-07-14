import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { Send, Square } from "lucide-react";

const ChatSubmitButton: React.FC<{
  isMessageEmpty: boolean;
  isStreaming: boolean;
  sendMessage: () => void;
  handleStop: () => void;
}> = ({ isMessageEmpty, isStreaming, sendMessage, handleStop }) => (
  <div className="flex items-end">
    <Button
      type="submit"
      variant="default"
      size="icon"
      className={clsx('text-white', {
        'bg-gray-600': isMessageEmpty && !isStreaming,
        'bg-gray-500 hover:bg-gray-400': !isMessageEmpty || isStreaming,
      })}
      disabled={isMessageEmpty && !isStreaming}
      onClick={isStreaming ? handleStop : sendMessage}
    >
      {isStreaming ? <Square className="h-4 w-4" /> : <Send className="h-4 w-4" />}
    </Button>
  </div>
);

export default ChatSubmitButton;