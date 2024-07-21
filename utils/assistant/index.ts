import { runAgent } from "./agents/human-in-the-loop";

export const queryAssistant = async function* (input: string, threadId: string) {
  for await (const messages of runAgent(input, threadId)) {
    yield { messages };
  }
};