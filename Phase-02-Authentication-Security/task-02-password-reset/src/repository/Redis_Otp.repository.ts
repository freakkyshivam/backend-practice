import redis from "../config/redis.js";
import { ApiError } from "../errors/ApiError.js";
import type { RedisOtpInterface } from "../interface/redis_otp.interface.js";
import crypto from "node:crypto";

export class RedisOtpRepository implements RedisOtpInterface {
  async generate(email: string): Promise<string> {
    const value = crypto.randomInt(100000, 1000000);
    const otp = value.toString();

    const redisKey = `verify-otp-${email}`;
    const attemptKey = `verify-otp-attempt-${email}`;

    await redis.set(redisKey, otp, "EX", 300);

    await redis.set(attemptKey, "0", "EX", 300);

    return otp;
  }

  async verify(email: string, otp: string): Promise<boolean> {
    const redisKey = `verify-otp-${email}`;
    const attemptKey = `verify-otp-attempt-${email}`;

    const storedOtp = await redis.get(redisKey);

    if (!storedOtp) {
      throw new ApiError("OTP is expired or not generated", 400);
    }

    if (storedOtp !== otp) {
      const count = await redis.incr(attemptKey);

      if (count > 5) {
        throw new ApiError("Too many attempts", 429);
      }

      throw new ApiError("Wrong OTP", 400);
    }

    await redis.del(redisKey, attemptKey);

    return true;
  }
}
