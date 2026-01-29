import { Request, Response } from "express";
import { UsuarioDatabase } from "../database/UsuarioDatabase";
import { ParticipanteDatabase } from "../database/ParticipanteDatabase";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export class LoginController {
  static async login(req: Request, res: Response): Promise<Response> {
    try {
      const { nome, senha, tipo, chave } = req.body;
      const login = new Login(nome, senha, tipo, chave);
      const person = await login.realizarLogin();
      if (!person) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }

      const token = jwt.sign({ id: person.id, nome: person.nome }, process.env.JWT_SECRET!, {
        expiresIn: "1h",
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Usa HTTPS em produção
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 24 horas
      });

      return res.status(200).json({ message: "Login bem-sucedido" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Usuario ou senha é invalida.", error });
    }
  }
}

class Login {
  nome: string;
  senha: string;
  tipo: "admin" | "participante";
  chave?: string;
  error = "Usuario ou senha é invalida.";

  constructor(nome: string, senha: string, tipo: string, chave?: string) {
    this.nome = nome;
    this.senha = senha;
    this.validade();
    if (tipo !== "admin" && tipo !== "participante") {
      throw new Error(this.error);
    }
    this.tipo = tipo;
    this.chave = chave;
  }
  validade() {
    if (!this.nome || !this.senha) {
      throw new Error(this.error);
    }
  }
  isAdmin() {
    return this.tipo === "admin";
  }
  isParticipante() {
    return this.tipo === "participante";
  }
  async realizarLogin() {
    if (this.isAdmin()) {
      const usuario = await UsuarioDatabase.findByName(this.nome);

      return {
        id: usuario.id,
        senha: usuario.senha,
        nome: usuario.nome,
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
