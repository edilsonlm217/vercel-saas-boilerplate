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

    // Inicializa o streaming das mensagens
    for await (
      const { messages } of await graph.stream(inputs, {
        ...config,
        streamMode: "values",
      })
    ) {
      // Retorna a primeira resposta com as mensagens processadas
      return new Response(JSON.stringify({ messages }), {
        headers: { "Content-Type": "application/json" },
      });
    }
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
