import { AppError } from "./AppError";
import { UserPassword } from "./UserPassword";
import { ZodAdapter } from "./ZodAdapter";

export interface UserType {
  id?: number;
  name: string;
  pasword: string;
  email: string;
}
export class UserModel {
  private id?: number;
  private name: string;
  private password: string;
  private email: string;
  // Minimum 8 chars, at least one lower, one upper, one number and one special char
  private static passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

  constructor(props: UserType) {
    this.id = props.id;
    this.name = props.name;
    this.password = props.pasword;
    this.email = ZodAdapter.emailSafeParse(props.email);
  }

  static validatePassword(password: string): boolean {
    return UserModel.passwordRegex.test(password);
  }

  getId(): number {
    if (this.id === undefined) throw new Error("Method not implemented.");
    return this.id;
  }

  getName(): string {
    return this.name;
  }
  setName(name: string) {
    this.name = name;
  }
  getPassword(): string {
    return this.password;
  }
  async setPassword(password: string) {
    this.password = await UserModel.encryptPassword(password);
  }
  getEmail(): string {
    return this.email;
  }
  setEmail(email: string) {
    this.email = ZodAdapter.emailSafeParse(email);
  }
  static async encryptPassword(password: string): Promise<string> {
    if (!UserModel.validatePassword(password)) {
      throw new AppError({
        message:
          "Senha não atende requisitos mínimos (mínimo 8 caracteres, incluir maiúscula, minúscula, número e caractere especial)",
        statusCode: 400,
      });
    }

    return await UserPassword.encrypt(password);
  }
  async comparePassword(password: string): Promise<boolean> {
    return await UserPassword.compare(password, this.password);
  }
}
