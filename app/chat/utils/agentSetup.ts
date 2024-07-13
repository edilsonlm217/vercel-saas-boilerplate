import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { AgentExecutor, createToolCallingAgent } from "langchain/agents";
import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from "zod";

const multiplyTool = new DynamicStructuredTool({
  name: "multiply",
  description: "multiply two numbers together",
  schema: z.object({
    a: z.number().describe("the first number to multiply"),
    b: z.number().describe("the second number to multiply"),
  }),
  func: async ({ a, b }: { a: number; b: number }) => {
    return (a * b).toString();
  },
});

const toolsSchema = z.object({
  a: z.number(),
  b: z.number(),
});

export const createAgentExecutor = async () => {
  const llm = new ChatOpenAI({
    model: "gpt-4",
    temperature: 1,
    apiKey: "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"
  });

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a helpful assistant"],
    ["placeholder", "{chat_history}"],
    ["human", "{input}"],
    ["placeholder", "{agent_scratchpad}"],
  ]);

  const tools: DynamicStructuredTool<typeof toolsSchema>[] = [multiplyTool];

  const agent = createToolCallingAgent({ llm, tools, prompt });

  const executor = new AgentExecutor({ agent, tools });

  return executor;
};