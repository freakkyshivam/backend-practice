 
import type { PasswordRepository } from "../interfaces/password.interface.js";
import type { UserRepository } from "../interfaces/user_repository.interface.js";

import type { Request, Response } from "express";

export class UserService{
    constructor(
            private readonly userRepository : UserRepository,
            private readonly passwordRepository : PasswordRepository
        ){
    
        };

        async create(name :string, email : string, password : string){

            const hashPassword = await this.passwordRepository.hash(password);

            const user = await this.userRepository.create(name, email, hashPassword);

            return user;
        }


        async login(email : string, password : string){

            const user = await this.userRepository.findByEmail(email)

            if(!user){
                throw new Error("User with this email not exists");
            }

            const res = await this.passwordRepository.verify(password, (await user).hashPassword);

            if(!res){
                throw new Error("Wrong password")
            }

            return  user.id
        }

        async getCurrUser(id : string){
            const user = await this.userRepository.findById(id);

            if(!id){
                throw new Error("User not found")
            }

            return user;
        }
}