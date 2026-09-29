import type { Request, Response, NextFunction } from "express";
import { redis } from "../config/redis.js";

const WINDOW_SECONDS = 60;
const MAX_REQUESTS = 30;

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
        message: "IP address is required",
      });
    }

    const key = `rate-limit:${ip}`;

    const count = await redis.incr(key);

    // First request → set expiry
    if (count === 1) {
      await redis.expire(key, WINDOW_SECONDS);
    }

    
    if (count > MAX_REQUESTS) {
      const ttl = await redis.ttl(key);

      res.setHeader("Retry-After", ttl);

      return res.status(429).json({
        success: false,
        message: "Too many requests. Please try again later.",
        retryAfter: ttl,
      });
    }

     
    res.setHeader("X-RateLimit-Limit", MAX_REQUESTS);
    res.setHeader(
      "X-RateLimit-Remaining",
      Math.max(0, MAX_REQUESTS - count)
    );

    return next();
  } catch (err) {
    console.error("Rate limiter error:", err);

    // Usually better to allow the request if Redis is temporarily down
    return next();
  }
};