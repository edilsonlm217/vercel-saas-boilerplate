import { useState, useCallback } from 'react';

export interface FetchStreamHook {
  stream: ReadableStream<any> | null;
  error: Error | null;
  isLoading: boolean;
  fetchStream: (url: string, options?: RequestInit) => Promise<void>;
}

const useFetchStream = (): FetchStreamHook => {
  const [stream, setStream] = useState<ReadableStream<any> | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchStream = useCallback(async (url: string, options?: RequestInit) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = response.body;
      setStream(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { stream, error, isLoading, fetchStream };
};

export default useFetchStream;
