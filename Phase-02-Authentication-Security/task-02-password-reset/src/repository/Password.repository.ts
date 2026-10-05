import type { PasswordInterface } from "../interface/password.interface.js";
import argon2 from 'argon2'

export class PasswordRepository implements PasswordInterface{
    hash(password: string): Promise<string> {
        return argon2.hash(password)
    }

    verify(password: string, hashPassword: string): Promise<boolean> {
        return argon2.verify(hashPassword,password)
    }
}