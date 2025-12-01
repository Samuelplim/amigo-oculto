import { Request, Response } from 'express';
import { connection } from '../db';

export class UsuarioController {
  static async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const usuarios = await connection('usuarios').select('*');
      return res.json(usuarios);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar usuários', error });
    }
  }

  static async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const usuario = await connection('usuarios')
        .where({ id })
        .first();
      
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
      
      const [id] = await connection('usuarios').insert({
        nome,
        senha,
      }).returning('id');
      
      const novoUsuario = await connection('usuarios')
        .where({ id })
        .first();
      
      return res.status(201).json(novoUsuario);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao criar usuário', error });
    }
  }

  static async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { nome, senha } = req.body;
      
      const usuario = await connection('usuarios')
        .where({ id })
        .first();
      
      if (!usuario) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      
      await connection('usuarios')
        .where({ id })
        .update({
          nome: nome ?? usuario.nome,
          senha: senha ?? usuario.senha,
          updated_at: connection.fn.now()
        });
      
      const usuarioAtualizado = await connection('usuarios')
        .where({ id })
        .first();
      
      return res.json(usuarioAtualizado);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao atualizar usuário', error });
    }
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      
      const deleted = await connection('usuarios')
        .where({ id })
        .del();
      
      if (!deleted) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao excluir usuário', error });
    }
  }
}