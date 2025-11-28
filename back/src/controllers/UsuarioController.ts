import { Request, Response } from 'express';
import { Usuario } from '../models/Usuario';

const usuarios: Usuario[] = [];

export class UsuarioController {
  static async getAll(req: Request, res: Response): Promise<Response> {
    return res.json(usuarios);
  }

  static async getById(req: Request, res: Response): Promise<Response> {
    const usuario = usuarios.find(u => u.id === Number(req.params.id));
    if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' });
    return res.json(usuario);
  }

  static async create(req: Request, res: Response): Promise<Response> {
    const { nome, senha } = req.body;
    const novoUsuario: Usuario = {
      id: usuarios.length + 1,
      nome,
      senha,
    };
    usuarios.push(novoUsuario);
    return res.status(201).json(novoUsuario);
  }

  static async update(req: Request, res: Response): Promise<Response> {
    const usuario = usuarios.find(u => u.id === Number(req.params.id));
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    const { nome, senha, imagem } = req.body;
    usuario.nome = nome ?? usuario.nome;
    usuario.senha = senha ?? usuario.senha;
    return res.json(usuario);
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    const index = usuarios.findIndex(u => u.id === Number(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Usuário não encontrado' });
    usuarios.splice(index, 1);
    return res.status(204).send();
  }
}