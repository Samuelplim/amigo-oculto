import { Request, Response } from 'express';
import connection from '../database/connection';

export class SorteioController {
  static async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const sorteios = await connection('sorteios').select('*');
      return res.json(sorteios);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar sorteios', error });
    }
  }

  static async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id_participante } = req.params;
      const sorteio = await connection('sorteios')
        .where({ id_participante })
        .first();
      
      if (!sorteio) {
        return res.status(404).json({ message: 'Sorteio não encontrado' });
      }
      
      return res.json(sorteio);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar sorteio', error });
    }
  }

  static async create(req: Request, res: Response): Promise<Response> {
    try {
      const { id_participante, id_participante_sorteado } = req.body;
      
      await connection('sorteios').insert({
        id_participante,
        id_participante_sorteado,
      });
      
      const novoSorteio = await connection('sorteios')
        .where({ id_participante })
        .first();
      
      return res.status(201).json(novoSorteio);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao criar sorteio', error });
    }
  }

  static async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id_participante } = req.params;
      const { id_participante_sorteado } = req.body;
      
      const sorteio = await connection('sorteios')
        .where({ id_participante })
        .first();
      
      if (!sorteio) {
        return res.status(404).json({ message: 'Sorteio não encontrado' });
      }
      
      await connection('sorteios')
        .where({ id_participante })
        .update({
          id_participante_sorteado: id_participante_sorteado ?? sorteio.id_participante_sorteado,
          updated_at: connection.fn.now()
        });
      
      const sorteioAtualizado = await connection('sorteios')
        .where({ id_participante })
        .first();
      
      return res.json(sorteioAtualizado);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao atualizar sorteio', error });
    }
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id_participante } = req.params;
      
      const deleted = await connection('sorteios')
        .where({ id_participante })
        .del();
      
      if (!deleted) {
        return res.status(404).json({ message: 'Sorteio não encontrado' });
      }
      
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao excluir sorteio', error });
    }
  }
}