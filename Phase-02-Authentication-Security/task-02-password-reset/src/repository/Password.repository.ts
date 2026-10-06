import { ApiError } from "../errors/ApiError.js";
import type { PasswordInterface } from "../interface/password.interface.js";
import argon2 from "argon2";

export class PasswordRepository implements PasswordInterface {
  async hash(password: string): Promise<string> {
    return await argon2.hash(password, {
      type: argon2.argon2id,
    });
  }

  async isSame(password: string, hashPassword: string): Promise<boolean> {
    const isSamePassword = await argon2.verify(hashPassword, password);

    if (isSamePassword) {
      throw new ApiError(
        "Password must be different from previous password",
        400,
      );
    }

    return true;
  }
}
