import type { SessionService } from "./sessions.service.js";
import type { PasswordRepository } from "../repositories/Password.repository.js";
import type { UserRepository } from "../repositories/User.repository.js";
import { ApiError } from "../errors/ApiError.js";

export class AuthService{

    constructor(
        private readonly sessionService : SessionService,
        private readonly passwordRepository : PasswordRepository,
        private readonly userRepository : UserRepository
    ){}

    login = async (email : string, password : string)=>{
        const user = await
        this.userRepository.getUserByEmail(email);

        if(!user){
            throw new ApiError("Invalid credentials",401)
        }

        const isValid = await this.passwordRepository.verify(
            user.hashPassword,
            password
        )

        if(!isValid){
            throw new ApiError("Invalid credentials", 401);
        }

        const sessionId = await this.sessionService.createSession(
            user.id
        )

        return sessionId;
    }
}