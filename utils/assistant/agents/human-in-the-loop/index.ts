import { HumanMessage } from "@langchain/core/messages";
import { setupAgent } from "./setup";

export const runAgent = async function* (input: string, threadId: string) {
  const graph = await setupAgent();

  const inputs = createInputs(input);
  const config = { configurable: { thread_id: threadId } };

  for await (
    const { messages } of await graph.stream(inputs, { ...config, streamMode: "values" })
  ) {
    yield { messages };
  }
};

export const createInputs = (text: string) => {
  return { messages: [new HumanMessage(text)] };
}
