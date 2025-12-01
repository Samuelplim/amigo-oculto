import { Request, Response } from 'express';
import connection from '../database/connection';

export class ParticipanteController {
  static async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const participantes = await connection('participantes').select('*');
      return res.json(participantes);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar participantes', error });
    }
  }

  static async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const participante = await connection('participantes')
        .where({ id })
        .first();
      
      if (!participante) {
        return res.status(404).json({ message: 'Participante não encontrado' });
      }
      
      return res.json(participante);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar participante', error });
    }
  }

  static async create(req: Request, res: Response): Promise<Response> {
    try {
      const { nome, senha, description, id_participante, evento } = req.body;
      const id = crypto.randomUUID();
      const created = new Date();
      const updated = new Date();
      
      await connection('participantes').insert({
        id,
        nome,
        senha: senha || null,
        description: description || null,
        id_participante,
        evento,
        created,
        updated
      });
      
      const novoParticipante = await connection('participantes')
        .where({ id })
        .first();
      
      return res.status(201).json(novoParticipante);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao criar participante', error });
    }
  }

  static async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { nome, senha, description, id_participante, evento } = req.body;
      
      const participante = await connection('participantes')
        .where({ id })
        .first();
      
      if (!participante) {
        return res.status(404).json({ message: 'Participante não encontrado' });
      }
      
      await connection('participantes')
        .where({ id })
        .update({
          nome: nome ?? participante.nome,
          senha: senha ?? participante.senha,
          description: description ?? participante.description,
          id_participante: id_participante ?? participante.id_participante,
          evento: evento ?? participante.evento,
          updated: new Date()
        });
      
      const participanteAtualizado = await connection('participantes')
        .where({ id })
        .first();
      
      return res.json(participanteAtualizado);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao atualizar participante', error });
    }
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      
      const deleted = await connection('participantes')
        .where({ id })
        .del();
      
      if (!deleted) {
        return res.status(404).json({ message: 'Participante não encontrado' });
      }
      
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao excluir participante', error });
    }
  }
}