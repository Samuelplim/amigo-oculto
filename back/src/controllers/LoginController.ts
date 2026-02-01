import { Request, Response } from "express";
import { UsuarioDatabase } from "../database/UsuarioDatabase";
import { ParticipanteDatabase } from "../database/ParticipanteDatabase";
import jwt from "jsonwebtoken";
import { ENV } from "../config/constant";

export class LoginController {
  static async login(req: Request, res: Response): Promise<Response> {
    const { email, password, tipo, chave } = req.body;
    const login = new Login(email, password, tipo, chave);
    const person = await login.realizarLogin();

    const token = jwt.sign(
      { id: person.id, nome: person.nome },
      ENV.JWT_SECRET!,
      {
        expiresIn: "1h",
      },
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production", // Usa HTTPS em produção
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 24 horas
    });

    return res.status(200).json({ message: "Login bem-sucedido" });
  }
}

class Login {
  email: string;
  password: string;
  tipo: "admin" | "participante";
  chave?: string;
  error = "Usuario ou senha é invalida.";

  constructor(email: string, password: string, tipo: string, chave?: string) {
    this.email = email;
    this.password = password;
    if (tipo !== "admin" && tipo !== "participante") {
      throw new Error(this.error);
    }
    this.tipo = tipo;
    this.chave = chave;
  }

  isAdmin() {
    return this.tipo === "admin";
  }
  isParticipante() {
    return this.tipo === "participante";
  }
  async realizarLogin() {
    if (this.isAdmin()) {
      const usuario = await UsuarioDatabase.findByEmail(this.email);
      if (!usuario) {
        throw new Error(this.error);
      }
      const result = await usuario.comparePassword(this.password);
      if (!result) {
        throw new Error(this.error);
      }
      return {
        id: usuario.getId(),
        senha: usuario.getPassword(),
        nome: usuario.getName(),
      };
    }
    if (this.isParticipante()) {
      const key = this.chave;
      if (key === undefined) {
        throw new Error(this.error);
      }
      const participante = await ParticipanteDatabase.findById(key);
      return {
        id: participante.id,
        eventoId: participante.eventoId,
        senha: participante.senha,
        nome: participante.nome,
        description: participante.description,
        created: participante.created,
        updated: participante.updated,
      };
    }
    throw new Error(this.error);
  }
}
