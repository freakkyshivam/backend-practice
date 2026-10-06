import { ApiError } from "../errors/ApiError.js";
import type { PasswordRepository } from "../repository/Password.repository.js";
import type { RedisOtpRepository } from "../repository/Redis_Otp.repository.js";
import type { UserRepository } from "../repository/User.repository.js";
import redis from "../config/redis.js";
export class PasswordResetService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly redisOtpRepository: RedisOtpRepository,
    private readonly passwordRepository: PasswordRepository,
  ) {}

  generateOtp = async (email: string): Promise<string> => {
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) {
       return "";
    }

    const otp = await this.redisOtpRepository.generate(email);

    return otp;
  };

  verifyOtpAndResetPassword = async (
    email: string,
    otp: string,
    newPassword: string,
  ): Promise<void> => {
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) {
       return;
    }

    await this.passwordRepository.isSame(newPassword, user.hashPassword);

    await this.redisOtpRepository.verify(email, otp);

    const hashPassword = await this.passwordRepository.hash(newPassword);

    await this.userRepository.forgotPassword(email, hashPassword);

    const redisKey = `verify-otp-${email}`;
    const attemptKey = `verify-otp-attempt-${email}`;

    await redis.del(redisKey, attemptKey);
  };
}
