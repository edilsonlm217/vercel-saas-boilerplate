import { useState, useCallback } from 'react';

export interface StreamingHook {
  isStreaming: boolean;
  startStreaming: (fetchStream: () => Promise<ReadableStream | null>) => void;
  stopStreaming: () => void;
}

const useStreaming = (
  onMessageReceived: (message: string) => void,
  onStart: () => void,
  onEnd?: () => void
): StreamingHook => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamReader, setStreamReader] = useState<ReadableStreamDefaultReader | null>(null);

  const startStreaming = useCallback(async (fetchStream: () => Promise<ReadableStream | null>) => {
    try {
      const stream = await fetchStream();
      if (!stream) throw new Error('No stream received');

      const reader = stream.getReader();
      setStreamReader(reader);
      setIsStreaming(true);
      onStart();

      const decoder = new TextDecoder();
      let result = '';

      const processText = async ({ done, value }: ReadableStreamReadResult<Uint8Array>) => {
        if (done) {
          setIsStreaming(false);
          if (onEnd) onEnd();
          return;
        }

        const chunk = decoder.decode(value, { stream: true });
        result += chunk;

        // Call the callback with the received chunk
        onMessageReceived(result);

        reader.read().then(processText);
      };

      reader.read().then(processText);
    } catch (error) {
      console.error('Error starting stream:', error);
      setIsStreaming(false);
      if (onEnd) onEnd();
    }
  }, [onMessageReceived, onStart, onEnd]);

  const stopStreaming = useCallback(() => {
    if (streamReader) {
      streamReader.cancel();
      setStreamReader(null);
    }
    setIsStreaming(false);
    if (onEnd) onEnd();
    console.log('Streaming stopped');
  }, [streamReader, onEnd]);

  return {
    isStreaming,
    startStreaming,
    stopStreaming,
  };
};

export default useStreaming;
