/**
 * Chat service
 * 
 * TODO: Replace static streaming with AI API streaming
 * This service will handle AI API calls and stream responses
 */

/**
 * Streams a static response to simulate AI behavior
 * In the future, this will stream from an AI API (OpenAI, Anthropic, etc.)
 */
export async function streamChatResponse(
  message: string,
  onChunk: (chunk: string) => void,
  onComplete: () => void
): Promise<void> {
  // Static response to simulate AI streaming
  const response = 
    "Backend streaming is working successfully.\n" +
    "This response is intentionally streamed in parts\n" +
    "to simulate real AI behavior.\n" +
    "The system is now ready for AI integration.";

  // Split response into chunks and stream with delays
  const words = response.split(' ');
  
  for (let i = 0; i < words.length; i++) {
    const chunk = i === 0 ? words[i] : ' ' + words[i];
    onChunk(chunk);
    
    // Small delay between chunks to simulate streaming
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  
  onComplete();
}

