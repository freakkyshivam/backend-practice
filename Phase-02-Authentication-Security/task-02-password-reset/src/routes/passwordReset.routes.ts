import express from 'express';
import { UserRepository } from '../repository/User.repository.js';
import { PasswordRepository } from '../repository/Password.repository.js';
import { RedisOtpRepository } from '../repository/Redis_Otp.repository.js';
import { PasswordResetService } from '../service/passwordReset.service.js';
import { PasswordResetController } from '../controller/passwordResetController.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const userRepository = new UserRepository();
const passwordRepository = new PasswordRepository();
const redisOtpRepository = new RedisOtpRepository();
const passwordResetService = new PasswordResetService(
    userRepository,
    redisOtpRepository,
    passwordRepository
)

const passwordResetController = new PasswordResetController(passwordResetService);

const router = express.Router();

router.post('/forgot-password', asyncHandler(passwordResetController.generateOtp));
router.post('/reset-password', asyncHandler(passwordResetController.verifyOtpAndResetPassword))

export default router;