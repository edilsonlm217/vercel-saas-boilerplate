import { createAgentGraph } from "@/utils/financial-agent/agentSetup";
import { HumanMessage } from "@langchain/core/messages";

export async function POST(req: Request) {
  try {
    // Extrai o texto da mensagem do corpo da requisição
    const { text } = await req.json();

    // Cria a entrada de mensagem usando o texto fornecido
    const inputs = { messages: [new HumanMessage(text)] };

    // Cria o grafo de agentes
    const graph = await createAgentGraph();
    const config = { configurable: { thread_id: "example-thread-1" } };

    // Cria um ReadableStream para enviar dados ao cliente em tempo real
    const stream = new ReadableStream({
      start(controller) {
        (async () => {
          try {
            for await (const { messages } of await graph.stream(inputs, {
              ...config,
              streamMode: "values",
            })) {
              // Envia cada mensagem como uma parte do stream
              controller.enqueue(JSON.stringify({ messages }) + "\n");
            }
            // Finaliza o stream
            controller.close();
          } catch (error) {
            controller.error(error);
          }
        })();
      },
    });

    // Retorna o stream como uma resposta
    return new Response(stream, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // Tratamento de erros com verificação de tipo
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
