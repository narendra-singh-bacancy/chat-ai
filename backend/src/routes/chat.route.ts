import { Router, Request, Response } from 'express';
import { streamChatResponse } from '../services/chat.service';

const router = Router();

/**
 * POST /api/chat
 * 
 * Streams chat response to client
 * TODO: Add request validation, rate limiting, authentication
 */
router.post('/', async (req: Request, res: Response) => {
  const { message } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Set headers for streaming
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    await streamChatResponse(
      message,
      (chunk: string) => {
        // Stream chunk to client
        res.write(chunk);
      },
      () => {
        // Complete the stream
        res.end();
      }
    );
  } catch (error) {
    console.error('Error streaming response:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.end();
    }
  }
});

export default router;

