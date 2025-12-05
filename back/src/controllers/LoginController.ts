import { Request, Response } from "express";
import { UsuarioModel } from "../models/Usuario";
import { ParticipanteModel } from "../models/Participante";

export class LoginController {
  static async login(req: Request, res: Response): Promise<Response> {
    try {
      const { nome, senha, tipo, chave } = req.body;
      if (!nome || !senha || !tipo) {
      }
      const login = new Login(nome, senha, tipo, chave);
      const person = await login.realizarLogin();
      if (!person) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }
      return res.json(person);
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
      console.log("realizar login admin");
      const usuario = await UsuarioModel.findByName(this.nome);

      return usuario;
    }
    if (this.isParticipante()) {
      const key = this.chave;
      if (key === undefined) {
        throw new Error(this.error);
      }
      const participante = await ParticipanteModel.findById(key);
      return participante;
    }
    throw new Error(this.error);
  }
}
