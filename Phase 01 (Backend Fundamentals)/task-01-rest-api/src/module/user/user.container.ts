
import { DrizzleUserRepository } from '../../database/repository/user.drizzle.repository.js'
import { PasswordService } from './infrastructure/password.service.js';
import { UserService } from './services/user.service.js';


const userRepository = new DrizzleUserRepository();
const passwordService = new PasswordService();

export const userService = new UserService(
    userRepository,
    passwordService
)