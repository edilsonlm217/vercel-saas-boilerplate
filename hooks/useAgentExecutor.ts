import { useEffect, useRef } from 'react';
import { AgentExecutor } from "langchain/agents";
import { createAgentExecutor } from '@/utils/financial-agent/agentSetup';

interface AgentExecutorHook {
  sendMessage: (message: string) => Promise<string>;
}

const useAgentExecutor = (): AgentExecutorHook => {
  const agentExecutorRef = useRef<AgentExecutor | null>(null);

  useEffect(() => {
    const setupAgent = async () => {
      const executor = await createAgentExecutor();
      agentExecutorRef.current = executor;
    };

    setupAgent();

    return () => { };
  }, []);

  const sendMessage = async (message: string): Promise<string> => {
    const executor = agentExecutorRef.current;
    if (!executor) {
      throw new Error('Agent Executor not initialized yet.');
    }

    const response = await executor.invoke({ input: message });
    return response.output;
  };

  return { sendMessage };
};

export default useAgentExecutor;
