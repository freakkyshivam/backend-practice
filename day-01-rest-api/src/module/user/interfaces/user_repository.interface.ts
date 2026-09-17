
import type { User } from "../../../domain/types/user.types.js"

export interface UserRepository  {
    create(name : string , email : string, hashPassword : string) : Promise<User | null>;
    findByEmail(email : string) : Promise<User | null>;
    findById(id : string) : Promise<User | null>
}