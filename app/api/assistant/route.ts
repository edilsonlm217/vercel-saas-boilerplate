import { z } from 'zod';
import { queryAssistant } from '@/utils/assistant';
import { createReadableStream, getResponseHeaders } from "@/utils/helpers";

const querySchema = z.object({
  query: z.string().min(10),
  threadId: z.string().uuid(),
})

export async function POST(req: Request) {
  const { query, threadId } = await req.json();

  const parsedData = querySchema.safeParse({ query, threadId });

  if (!parsedData.success) {
    return new Response(
      JSON.stringify({ error: parsedData.error.errors[0].message }), {
      status: 400,
      headers: getResponseHeaders(),
    });
  }

  const chunks = queryAssistant(query, threadId);
  const stream = createReadableStream(chunks);

  const headers = getResponseHeaders();
  return new Response(stream, { headers });
}
