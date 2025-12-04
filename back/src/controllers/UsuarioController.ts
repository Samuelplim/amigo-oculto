import { Request, Response } from "express";
import { UsuarioModel } from "../models/Usuario";

export class UsuarioController {
  static async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const usuarios = await UsuarioModel.findMany();
      return res.json(usuarios);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao buscar usuários", error });
    }
  }

  static async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const usuario = await UsuarioModel.findById(Number(id));

      if (!usuario) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      return res.json(usuario);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar usuário", error });
    }
  }

  static async create(req: Request, res: Response): Promise<Response> {
    try {
      const { nome, senha } = req.body;

      const novoUsuario = await UsuarioModel.create({
        nome,
        senha,
      });

      return res.status(201).json(novoUsuario);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao criar usuário", error });
    }
  }

  static async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { nome, senha } = req.body;

      const usuarioAtualizado = await UsuarioModel.update({
        id: parseInt(id!),
        data: {
          nome,
          senha,
        },
      });

      return res.json(usuarioAtualizado);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao atualizar usuário", error });
    }
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      await UsuarioModel.delete({
        id: parseInt(id!),
      });

      return res.status(204).send();
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao deletar usuário", error });
    }
  }
}
