import { Request, Response } from 'express';
import connection from '../database/connection';

export class PresenteController {
  static async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const presentes = await connection('presentes').select('*');
      return res.json(presentes);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar presentes', error });
    }
  }

  static async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const presente = await connection('presentes')
        .where({ id })
        .first();
      
      if (!presente) {
        return res.status(404).json({ message: 'Presente não encontrado' });
      }
      
      return res.json(presente);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar presente', error });
    }
  }

  static async create(req: Request, res: Response): Promise<Response> {
    try {
      const { nome, id_participante } = req.body;
      const id = crypto.randomUUID();
      
      await connection('presentes').insert({
        id,
        nome,
        id_participante
      });
      
      const novoPresente = await connection('presentes')
        .where({ id })
        .first();
      
      return res.status(201).json(novoPresente);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao criar presente', error });
    }
  }

  static async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { nome, id_participante } = req.body;
      
      const presente = await connection('presentes')
        .where({ id })
        .first();
      
      if (!presente) {
        return res.status(404).json({ message: 'Presente não encontrado' });
      }
      
      await connection('presentes')
        .where({ id })
        .update({
          nome: nome ?? presente.nome,
          id_participante: id_participante ?? presente.id_participante,
          updated_at: connection.fn.now()
        });
      
      const presenteAtualizado = await connection('presentes')
        .where({ id })
        .first();
      
      return res.json(presenteAtualizado);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao atualizar presente', error });
    }
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      
      const deleted = await connection('presentes')
        .where({ id })
        .del();
      
      if (!deleted) {
        return res.status(404).json({ message: 'Presente não encontrado' });
      }
      
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao excluir presente', error });
    }
  }
}