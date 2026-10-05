import type { Request, Response } from "express";
import { PasswordResetService } from "../service/passwordReset.service.js";
import {
  generateOtpValidator,
  verifyOtpAndResetPasswordValidator,
} from "../validator/passwordResetValidator.js";
import { ApiError } from "../errors/ApiError.js";

export class PasswordResetController {
  constructor(private readonly passwordResetService: PasswordResetService) {}

  generateOtp = async (req: Request, res: Response) => {
    const validationResult = generateOtpValidator.safeParse(req.body);

    if (!validationResult.success) {
      throw new ApiError(
        validationResult.error.flatten().fieldErrors.email?.[0] ??
          "Invalid email",
        400,
      );
    }
    const { email } = validationResult.data;

    await this.passwordResetService.generateOtp(email);

    return res.status(200).json({
      success: true,
      message: "If an account exists, password reset otp have been sent.",
    });
  };

  verifyOtpAndResetPassword = async (req: Request, res: Response) => {
    const validationResult = verifyOtpAndResetPasswordValidator.safeParse(
      req.body,
    );

    if (!validationResult.success) {
      throw new ApiError(validationResult.error.message, 400);
    }

    const { email, otp, password } = validationResult.data;

    await this.passwordResetService.verifyOtpAndResetPassword(
      email,
      otp,
      password,
    );

    return res.status(200).json({
      success: true,
      message: "Password has been reset successfully.",
    });
  };
}
