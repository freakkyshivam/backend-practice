import { eq } from "drizzle-orm";
import type { User } from "../../domain/types/user.types.js";
import type { UserRepository } from "../../module/user/interfaces/user_repository.interface.js";
import db from "../connection/db.js";
import users from "../schema/user.schema.js";

export class DrizzleUserRepository implements UserRepository {

    async create(name: string, email: string, hashPassword: string): Promise<User | null> {
        
        const [result] = await db
        .insert(users)
        .values({
            name,
            email,
            hashPassword
        }).returning();

        if(!result){
            return null;
        }

        return result;
    }

   async findByEmail(email: string): Promise<User | null> {
        const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

        if(!user){
            return null;
        }

        return user
    }

    async findById(id: string): Promise<User | null> {
        const [user] = await db
        .select()
        .from(users)
        .where(eq(users.id, id))
        .limit(1);

        if(!user){
            return null;
        }

        return user
    }
}