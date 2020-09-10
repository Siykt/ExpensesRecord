import { RequestHandler } from 'express';

/**
 * Print Request Log
 */
export const requestLogger: RequestHandler = (req, res, next) => {
  console.log('[REQUEST LOG]: ', req.method, req.url);
  next();
};
