import { runAgent } from "./agents/human-in-the-loop";

export const queryAssistant = async function* (input: string, threadId: string) {
  for await (const message of runAgent(input, threadId)) {
    yield message;
  }
};