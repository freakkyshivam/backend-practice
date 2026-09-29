import type { Request, Response, NextFunction } from "express";

interface LimiterI {
  count: number;
  windowStart: Date;
}

const limiter = new Map<string, LimiterI>();

export const rateLimiterMiddleware =  (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const ip = req.ip;

    if (!ip) {
      throw new Error("IP is required");
    }

    const now = Date.now();
    const windowSize = 60 * 1000; 
    const maxRequests = 5;

    const l = limiter.get(ip);

    if (!l) {
      limiter.set(ip, {
        count: 1,
        windowStart: new Date(now),
      });

      return next();
    } 

    const windowEnd = l.windowStart.getTime() + windowSize;

    if(windowEnd > now){

        l.count++;

        if(l.count > maxRequests){
            return res.status(429).json({
                msg : "To many request, please try again later"
            })
        }

        return next();
    }

    limiter.set(ip,{
        count : 1,
        windowStart : new Date(now)
    })

   return next()

  } catch (err) {
    return res.status(429).json({
      msg:
        err instanceof Error
          ? err.message
          : "To many request, Please try again later",
    });
  }
};
