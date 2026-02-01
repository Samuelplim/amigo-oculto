import { Request, Response } from "express";
import { UsuarioDatabase } from "../database/UsuarioDatabase";
import { UserModel } from "../models/UsuarioModel";

export class UsuarioController {
  static async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const usuarios = await UsuarioDatabase.findMany();
      return res.json(usuarios);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao buscar usuários", error });
    }
  }

  static async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const usuario = await UsuarioDatabase.findById(Number(id));
    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    return res.json(usuario);
  }

  static async create(req: Request, res: Response): Promise<Response> {
    const { name, pasword, email } = req.body;
    const passwordCrypted = await UserModel.encryptPassword(pasword);
    const novoUsuario = await UsuarioDatabase.create(
      new UserModel({ name, pasword: passwordCrypted, email }),
    );
    return res.status(201).json(novoUsuario);
  }

  static async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, password } = req.body;
    if (id === undefined) {
      return res.status(400).json({ message: "ID do usuário é obrigatório" });
    }
    if (isNaN(parseInt(id))) {
      return res.status(400).json({ message: "ID do usuário inválido" });
    }
    const user = await UsuarioDatabase.findById(parseInt(id!));
    user.setName(name);
    await user.setPassword(password);
    await UsuarioDatabase.update(user);
    return res.status(204).send();
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    if (id === undefined) {
      return res.status(400).json({ message: "ID do usuário é obrigatório" });
    }
    if (isNaN(parseInt(id))) {
      return res.status(400).json({ message: "ID do usuário inválido" });
    }
    const user = await UsuarioDatabase.findById(parseInt(id!));
    await UsuarioDatabase.delete(user);
    return res.status(204).send();
  }
}
