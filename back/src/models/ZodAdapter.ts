import { z } from "zod";
import { AppError } from "./AppError";

export abstract class ZodAdapter {
  static emailSafeParse(email: string): string {
    const emailSchema = z.email({ message: "Endereço de e-mail inválido" });
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      throw new AppError({ message: "Email inválido", statusCode: 400 });
    }
    return result.data;
  }
}
