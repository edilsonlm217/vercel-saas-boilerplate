import { AIMessageChunk, HumanMessage } from "@langchain/core/messages";
import { setupAgent } from "./setup";

export const runAgent = async function* (input: string, threadId: string) {
  const agent = await setupAgent();

  const inputs = createInputs(input);
  const config = { configurable: { thread_id: threadId } };

  const eventStream = agent.streamEvents(inputs, { version: "v2", ...config });

  for await (const { event, data } of eventStream) {
    if (event === "on_chat_model_stream") {
      const msg = data.chunk as AIMessageChunk;
      if (!msg.tool_call_chunks?.length) {
        yield msg.content;
      }
    }
  }
};

export const createInputs = (text: string) => {
  return { messages: [new HumanMessage(text)] };
}
