import { Router, Request, Response } from 'express';
import { streamAIResponse } from '../services/ai.service';

const router = Router();

/**
 * POST /api/chat
 * 
 * Streams AI chat response to client using Groq
 * Request body: { messages: [{ role: "user", content: "Hello" }] }
 * 
 * TODO: Add request validation, rate limiting, authentication
 */
router.post('/', async (req: Request, res: Response) => {
  const { messages } = req.body;

  // Validate messages array
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Messages array is required' });
  }

  // Validate message structure
  for (const msg of messages) {
    if (!msg.role || !msg.content || typeof msg.content !== 'string') {
      return res.status(400).json({ 
        error: 'Each message must have role and content (string)' 
      });
    }
  }

  // Set headers for streaming
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    await streamAIResponse(
      messages,
      (chunk: string) => {
        // Stream chunk to client
        res.write(chunk);
      },
      () => {
        // Complete the stream
        res.end();
      },
      (error: Error) => {
        // Handle error
        console.error('AI streaming error:', error);
        if (!res.headersSent) {
          res.status(500).json({ error: 'Failed to get AI response' });
        } else {
          res.end();
        }
      }
    );
  } catch (error) {
    console.error('Error in chat route:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.end();
    }
  }
});

export default router;

