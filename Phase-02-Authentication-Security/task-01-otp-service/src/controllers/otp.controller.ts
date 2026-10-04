import type { Request, Response } from "express";
import type { OtpService } from "../services/otp.service.js";
import AppError from "../errors/AppErrors.js";

export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  generateOtp = async (req: Request, res: Response) => {
    const { identifiers } = req.body;

    if (!identifiers || identifiers === "") {
      throw new AppError("Email is required", 400);
    }

    const otp = await this.otpService.generate(identifiers);

    if (!otp) {
      throw new AppError("OTP generation failed", 500);
    }

    console.log("OTP is ", otp);
    return res.status(200).json({
      success: true,
      status: 200,
      msg: "OTP generated and sent to the email",
      data: [],
    });
  };

  verifyOtp = async (req: Request, res: Response) => {
    const { identifiers, otp } = req.body;

    if (!identifiers || identifiers === "") {
      throw new AppError("Email are required", 400);
    }

    if (!otp || otp === "") {
      throw new AppError("OTP are required", 400);
    }

    if (!/^\d{6}$/.test(otp)) {
      throw new AppError("Invalid OTP format", 400);
    }

    const result = await this.otpService.verify(identifiers, otp);

    if (!result) {
      throw new AppError("OTP verification failed", 500);
    }

    return res.status(200).json({
      success: true,
      status: 200,
      msg: "OTP verification successfull",
      data: [],
    });
  };
}
