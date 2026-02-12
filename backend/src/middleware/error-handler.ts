import { Request, Response, NextFunction } from 'express';
import z from 'zod';

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof z.ZodError) {
    return res.status(400).json({
      message: err.message,
      details: err.errors,
    });
  }

  const message = err instanceof Error ? err.message : 'Internal Server Error'
  res.status(500).json({ message })
}