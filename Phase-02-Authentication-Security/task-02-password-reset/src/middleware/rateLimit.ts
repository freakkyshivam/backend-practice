import type { Request, Response, NextFunction } from "express";
import { redis } from "../config/redis.js";

export const rateLimiter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ip = req.ip;

    if (!ip) {
      return res.status(400).json({
        success: false,
        message: "IP address not found",
      });
    }

    const windowSize = 60;  
    const maxRequests = 100;

    const key = `rate-limit:${ip}`;
 
    const requestCount = await redis.incr(key);
 
    if (requestCount === 1) {
      await redis.expire(key, windowSize);
    }
 
    if (requestCount > maxRequests) {
      const ttl = await redis.ttl(key);

      res.setHeader("Retry-After", ttl);

      return res.status(429).json({
        success: false,
        message: "Too many requests",
        retryAfter: ttl,
      });
    }

     

    next();
  } catch (error) {
    console.error("Rate limiter error:", error);

    next();
  }
};