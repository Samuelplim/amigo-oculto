import { Request, Response } from "express";
import { UsuarioDatabase } from "../database/UsuarioDatabase";
import { UsuarioModel } from "../models/UsuarioModel";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

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
    try {
      const { id } = req.params;

      const usuario = await UsuarioDatabase.findById(Number(id));

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
      console.log("Dados recebidos:", req.body);

      const novoUsuario = await UsuarioDatabase.create(
        new UsuarioModel({ nome, senha }),
      );

      return res.status(201).json(novoUsuario);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao criar usuário", error });
    }
  }

  static async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { nome, senha } = req.body;
      if (id === undefined) {
        return res.status(400).json({ message: "ID do usuário é obrigatório" });
      }
      if (isNaN(parseInt(id))) {
        return res.status(400).json({ message: "ID do usuário inválido" });
      }

      const user = await UsuarioDatabase.findById(parseInt(id!));
      user.nome = nome;
      user.senha = senha;

      const usuarioAtualizado = await UsuarioDatabase.update(user);

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
      if (id === undefined) {
        return res.status(400).json({ message: "ID do usuário é obrigatório" });
      }
      if (isNaN(parseInt(id))) {
        return res.status(400).json({ message: "ID do usuário inválido" });
      }

      const user = await UsuarioDatabase.findById(parseInt(id!));
      await UsuarioDatabase.delete(user);

      return res.status(204).send();
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao deletar usuário", error });
    }
  }

  static async login(req: Request, res: Response): Promise<Response> {
    try {
      const { nome, senha } = req.body;

      // Verifica se o usuário existe no banco de dados
      const usuario = await UsuarioDatabase.findByName(nome);
      if (!usuario || usuario.senha !== senha) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }

      // Gera o token JWT
      const token = jwt.sign({ id: usuario.id, nome: usuario.nome }, process.env.JWT_SECRET!, {
        expiresIn: "1h",
      });

      // Define o cookie HTTP-Only
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Usa HTTPS em produção
        sameSite: "strict",
        maxAge: 3600000, // 1 hora
      });

      return res.status(200).json({ message: "Login bem-sucedido" });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao realizar login", error });
    }
  }
}
