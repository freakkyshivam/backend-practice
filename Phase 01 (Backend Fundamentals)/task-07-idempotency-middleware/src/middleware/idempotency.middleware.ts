import type { Request, Response, NextFunction } from "express";
import crypto from "node:crypto";

interface StoredResponse {
  statusCode: number;
  body: unknown;
  requestHash: string;
}

export const idempotencyStore = new Map<string, StoredResponse>();

export const idempotecyMid = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const key = req.headers["idempotency-key"];

    if (!key) {
      return res.status(400).json({
        success: false,
        msg: "Idempotency key is required",
      });
    }

    const { productId, quantity } = req.body;

    const requestHash = crypto
      .createHash("sha256")
      .update(JSON.stringify({ productId, quantity }))
      .digest("hex");

    const cached = idempotencyStore.get(key as string);

    if (cached) {
      if (cached.requestHash === requestHash) {
        return res.status(cached.statusCode).json({
          success: true,
          msg: "Order created (Cached response)",
          data: cached.body,
        });
      } else {
        return res.status(400).json({
          msg: "Invalid request",
        });
      }
    }

    const originalJson = res.json.bind(res);

    res.json = (body) => {
      idempotencyStore.set(key as string, {
        body: { productId, quantity },
        statusCode: 201,
        requestHash,
      });

      console.log("Controller ka response:", body);
      return originalJson(body);
    };

    return next();
  } catch (err) {
    throw err;
  }
};
