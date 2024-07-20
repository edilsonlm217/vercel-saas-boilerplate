import { AIMessage, BaseMessage } from "@langchain/core/messages";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { StateGraphArgs, END, START, StateGraph, MemorySaver } from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";

import { z } from "zod";

import { ChatOpenAI } from "@langchain/openai";
import { RunnableConfig } from "@langchain/core/runnables";

interface IState {
  messages: BaseMessage[];
}

export const createAgentGraph = async () => {
  // This defines the agent state
  const graphState: StateGraphArgs<IState>["channels"] = {
    messages: {
      value: (x: BaseMessage[], y: BaseMessage[]) => x.concat(y),
      default: () => [],
    },
  };

  const searchTool = new DynamicStructuredTool({
    name: "search",
    description: "Call to surf the web.",
    schema: z.object({
      query: z.string().describe("The query to use in your search."),
    }),
    func: async ({ }: { query: string }) => {
      // This is a placeholder for the actual implementation
      // Don't let the LLM know this though 😊
      return "It's sunny in San Francisco, but you better look out if you're a Gemini 😈.";
    },
  });

  const tools = [searchTool];

  const toolNode = new ToolNode<{ messages: BaseMessage[] }>(tools);

  const model = new ChatOpenAI({
    model: "gpt-4",
    temperature: 0,
    openAIApiKey: "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"
  });

  // After we've done this, we should make sure the model knows that it has these tools available to call.
  // We can do this by binding the tools to the model class.
  const boundModel = model.bindTools(tools);

  const routeMessage = (state: IState) => {
    const { messages } = state;
    const lastMessage = messages[messages.length - 1] as AIMessage;
    // If no tools are called, we can finish (respond to the user)
    if (!lastMessage?.tool_calls?.length) {
      return END;
    }
    // Otherwise if there is, we continue and call the tools
    return "tools";
  };

  const callModel = async (
    state: IState,
    config?: RunnableConfig,
  ) => {
    const { messages } = state;
    const response = await boundModel.invoke(messages, config);
    return { messages: [response] };
  };

  const workflow = new StateGraph<IState>({
    channels: graphState,
  })
    .addNode("agent", callModel)
    .addNode("tools", toolNode)
    .addEdge(START, "agent")
    .addConditionalEdges("agent", routeMessage)
    .addEdge("tools", "agent");

  // **Persistence**
  // Human-in-the-loop workflows require a checkpointer to ensure
  // nothing is lost between interactions
  const checkpointer = new MemorySaver();

  // **Interrupt**
  // To always interrupt before a particular node, pass the name of the node to `interruptBefore` when compiling.
  const graph = workflow.compile({ checkpointer, interruptBefore: ["tools"] });

  return graph;
}
