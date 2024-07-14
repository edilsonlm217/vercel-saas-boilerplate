import { Message } from "./message.types";

/**
 * Interface for the custom chat hook `useChat`.
 * Represents the state and handlers for chat functionality.
 */
export interface ChatHook {
  /**
   * List of messages in the chat.
   */
  messages: Message[];

  /**
   * Current message input value.
   */
  message: string;

  /**
   * Handler for input change event.
   * @param e - The change event from a textarea element.
   */
  handleInput: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;

  /**
   * Handler for key down event in the textarea.
   * @param e - The keyboard event from a textarea element.
   */
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;

  /**
   * Function to send the current message.
   */
  sendMessage: () => void;

  /**
   * Boolean indicating if the current message is empty after trimming.
   */
  isMessageEmpty: boolean;

  /**
   * Boolean indicating if the message is being streamed.
   */
  isStreaming: boolean;

  /**
   * Function to stop message streaming.
   */
  handleStop: () => void;
}
