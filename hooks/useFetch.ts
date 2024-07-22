import { useState, useCallback } from 'react';

export interface FetchHook<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  fetchData: (url: string, options?: RequestInit) => Promise<ReadableStream | null>;
}

const useFetch = <T>(): FetchHook<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async (url: string, options?: RequestInit) => {
    setIsLoading(true);
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setIsLoading(false);
      return response.body;
    } catch (err) {
      setError(err as Error);
      setIsLoading(false);
      return null;
    }
  }, []);

  return { data, error, isLoading, fetchData };
};

export default useFetch;
