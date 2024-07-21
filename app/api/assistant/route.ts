import { createStreamingResponse } from "@/utils/helpers";
import { createAgentGraph, createInputs } from "@/utils/agent/setup";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    const inputs = createInputs(text);
    const graph = await createAgentGraph();
    const config = { configurable: { thread_id: "example-thread-1" } };

    // Função geradora para streaming
    const streamGenerator = async function* () {
      for await (const { messages } of await graph.stream(inputs, {
        ...config,
        streamMode: "values",
      })) {
        yield { messages };
      }
    };

    // Cria e retorna a resposta de streaming
    return createStreamingResponse(streamGenerator);
  } catch (error) {
    let errorMessage = 'An unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
