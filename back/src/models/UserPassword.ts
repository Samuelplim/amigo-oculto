import { hash, compare } from "bcrypt";
import { randomInt } from "crypto";

export abstract class UserPassword {
  static async encrypt(password: string): Promise<string> {
    const randomSalt = randomInt(10, 16);
    return await hash(password, randomSalt);
  }
  static async compare(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await compare(password, hashedPassword);
  }
}
