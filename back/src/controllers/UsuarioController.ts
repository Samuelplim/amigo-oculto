import { Request, Response } from 'express';
import { prisma } from '../config/database';

export class UsuarioController {
  static async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const usuarios = await prisma.usuario.findMany();
      return res.json(usuarios);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar usuários', error });
    }
  }

  static async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const usuario = await prisma.usuario.findUnique({
        where: { id: parseInt(id!) }
      });
      
      if (!usuario) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      
      return res.json(usuario);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar usuário', error });
    }
  }

  static async create(req: Request, res: Response): Promise<Response> {
    try {
      const { nome, senha } = req.body;
      
      const novoUsuario = await prisma.usuario.create({
        data: {
          nome,
          senha,
        }
      });
      
      return res.status(201).json(novoUsuario);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao criar usuário', error });
    }
  }

  static async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { nome, senha } = req.body;
      
      const usuarioAtualizado = await prisma.usuario.update({
        where: { id: parseInt(id!) },
        data: {
          nome,
          senha,
        }
      });
      
      return res.json(usuarioAtualizado);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao atualizar usuário', error });
    }
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      
      await prisma.usuario.delete({
        where: { id: parseInt(id!) }
      });
      
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao deletar usuário', error });
    }
  }
}