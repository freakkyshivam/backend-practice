
import { eq } from 'drizzle-orm'
import db from '../database/connection/db.js'
import { userSchema } from '../database/index.js'
import type { UserI } from '../domains/user.types.js'
import type {UserInterface} from '../interface/user.interface.js'

export class UserRepository implements UserInterface{
    
    async getUserByEmail(email: string): Promise<UserI | null> {
        const [result] = await db
        .select()
        .from(userSchema)
        .where(eq(
            userSchema.email,
            email
        ))

        return result ? result : null;
    }

  async forgotPassword(email: string, newPassword: string): Promise<void> {
       await db
       .update(userSchema)
       .set({
        hashPassword : newPassword
       })
       .where(eq(userSchema.email, email))
    }
}