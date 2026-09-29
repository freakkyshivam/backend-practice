import argon2 from "argon2";
import type { PasswordRepository } from "../interfaces/password.interface.js";

export class PasswordService implements PasswordRepository{
    hash(password: string): Promise<string> {
        return argon2.hash(password);
    }

    verify(password: string, hashPassword: string): Promise<boolean> {
        return argon2.verify(hashPassword, password);
    }
}