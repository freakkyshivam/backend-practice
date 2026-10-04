import type { OtpRepository } from "../repository/otp.repository.js";

 
export class OtpService {

    constructor(
       private readonly otpRepository : OtpRepository
    ){}

    async generate(email : string){
        return await this.otpRepository.generateOtp(email)
    }

    async verify(email : string, otp : string){
        return await this.otpRepository.verifyOtp(email, otp)
    }
}