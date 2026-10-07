import argon2 from "argon2";

export class PasswordRepository {
  async hash(password: string): Promise<string> {
    return await argon2.hash(password, {
      type: argon2.argon2id,
    });
  }

  async verify(hashPassword : string, password : string) : Promise<boolean>{
    return await argon2.verify(
        hashPassword,
        password
    )
  }
}
