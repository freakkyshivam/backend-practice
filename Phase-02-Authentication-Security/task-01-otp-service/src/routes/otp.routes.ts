import express from 'express'

import { OtpRepository } from '../repository/otp.repository.js'
import { OtpService } from '../services/otp.service.js'
import { OtpController } from '../controllers/otp.controller.js'
import { asyncHandler } from '../utils/asyncHandler.js';

const otpRepository = new OtpRepository();
const otpService = new OtpService(otpRepository);
const otpController = new OtpController(otpService);

const router = express.Router();


router.post('/generate', asyncHandler(otpController.generateOtp))
router.post('/verify', asyncHandler(otpController.verifyOtp))


export default router;