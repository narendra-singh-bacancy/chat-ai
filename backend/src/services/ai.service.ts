import OpenAI from 'openai';

/**
 * AI Service
 * 
 * Handles Groq AI API integration with streaming support
 * Uses OpenAI-compatible SDK for Groq API
 */

// Initialize Groq client (OpenAI-compatible)
const groqClient = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});

/**
 * Streams AI response from Groq
 * 
 * @param messages - Array of message objects with role and content
 * @param onChunk - Callback function called for each text chunk
 * @param onComplete - Callback function called when streaming completes
 * @param onError - Callback function called on error
 */
export async function streamAIResponse(
  messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>,
  onChunk: (chunk: string) => void,
  onComplete: () => void,
  onError: (error: Error) => void
): Promise<void> {
  try {
    // Add system prompt if not already present
    const systemPrompt = "You are a helpful AI assistant.";
    const hasSystemMessage = messages.some(msg => msg.role === 'system');
    const messagesWithSystem = hasSystemMessage 
      ? messages 
      : [{ role: 'system' as const, content: systemPrompt }, ...messages];

    // Call Groq API with streaming enabled
    const stream = await groqClient.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: messagesWithSystem,
      temperature: 0.7,
      max_tokens: 2048,
      stream: true,
    });

    // Process stream chunks
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        onChunk(content);
      }
    }

    onComplete();
  } catch (error) {
    console.error('Error streaming AI response:', error);
    onError(error instanceof Error ? error : new Error('Unknown error occurred'));
  }
}

