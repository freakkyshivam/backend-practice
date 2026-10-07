import { eq } from "drizzle-orm";
import db from "../database/connection/db.js";
import { userSchema } from "../database/index.js";
import type { UserI } from "../domains/user.types.js";

export class UserRepository{

   async getUserByEmail(email : string) : Promise<UserI | null>{
        const [user] = await
        db.select()
        .from(userSchema)
        .where(eq(
            userSchema.email,
            email
        ))
        .limit(1);

        return user ? user : null;
    }
}