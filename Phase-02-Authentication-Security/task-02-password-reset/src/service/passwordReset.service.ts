import { ApiError } from "../errors/ApiError.js";
import type { PasswordRepository } from "../repository/Password.repository.js";
import type { RedisOtpRepository } from "../repository/Redis_Otp.repository.js";
import type { UserRepository } from "../repository/User.repository.js";


export class PasswordResetService{

    constructor(
        private readonly userRepository : UserRepository,
        private readonly redisOtpRepository : RedisOtpRepository,
        private readonly passwordRepository : PasswordRepository
    ){}

    generateOtp = async(email : string) : Promise<string> =>{

        const user = this
        .userRepository.getUserByEmail(email);

        if(!user){
            throw new ApiError("User not found", 404)
        }

        const otp = await this.redisOtpRepository.generate(email);

        return otp
    }

    verifyOtpAndResetPassword = async (
        email : string,
        otp : string,
        newPassword : string
    ) : Promise<void> =>{

         await this.redisOtpRepository.verify(email, otp);
        
         const hashPassword = await this.
         passwordRepository
         .hash(newPassword)

         await this.userRepository
         .forgotPassword(
            email,
            hashPassword
         )
    }
}