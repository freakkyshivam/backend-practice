import { redis } from "../config/redisClient.js";
import crypto from "node:crypto";
import AppError from "../errors/AppErrors.js";

export class OtpRepository {

  generateOtp = async (email: string): Promise<string> => {

    const value = crypto.randomInt(100000, 1000000);
    const otp = value.toString();

    const redisKey = `verify-otp-${email}`;
    const attemptKey = `verify-otp-attempt-${email}`;


    await redis.set(redisKey, otp, 
      "EX" , 300
    );


    await redis.set(attemptKey, "0", 
      'EX', 300
    );

    return otp;
  };


  verifyOtp = async (
    email: string,
    otp: string
  ): Promise<boolean> => {

    const redisKey = `verify-otp-${email}`;
    const attemptKey = `verify-otp-attempt-${email}`;

    const storedOtp = await redis.get(redisKey);

    if (!storedOtp) {
      throw new AppError("OTP is expired or not generated", 400);
    }

    if (storedOtp !== otp) {

      const count = await redis.incr(attemptKey);

      if (count > 5) {
        throw new AppError("Too many attempts", 429);
      }

      throw new AppError("Wrong OTP", 400);
    }

    await redis.del(redisKey, attemptKey);

    return true;
  };
}