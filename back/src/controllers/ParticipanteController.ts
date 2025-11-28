import { Request, Response } from 'express';
import { Participante } from '../models/Participante';

const participantes: Participante[] = [];

export class ParticipanteController {
  static async getAll(req: Request, res: Response) {
    res.json(participantes);
  }

  static async getById(req: Request, res: Response): Promise<Response> {
    const participante = participantes.find(p => p.id === req.params.id);
    if (!participante) return res.status(404).json({ message: 'Participante não encontrado' });
    return res.json(participante);
  }

  static async create(req: Request, res: Response) {
    const { nome, senha, description, id_participante, evento, created, updated } = req.body;
    const novoParticipante: Participante = {
      id: crypto.randomUUID(),
      nome,
      senha: senha || null,
      description: description || null,
      id_participante,
      evento,
      created,
      updated
    };
    participantes.push(novoParticipante);
    res.status(201).json(novoParticipante);
  }

  static async update(req: Request, res: Response): Promise<Response> {
    const participante = participantes.find(p => p.id === req.params.id);
    if (!participante) return res.status(404).json({ message: 'Participante não encontrado' });
    const { nome, senha, description, id_participante, evento, created, updated } = req.body;
    participante.nome = nome ?? participante.nome;
    participante.senha = senha ?? participante.senha;
    participante.description = description ?? participante.description;
    participante.id_participante = id_participante ?? participante.id_participante;
    participante.evento = evento ?? participante.evento;
    participante.created = created ?? participante.created;
    participante.updated = updated ?? participante.updated;
    return res.json(participante);
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    const index = participantes.findIndex(p => p.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Participante não encontrado' });
    participantes.splice(index, 1);
    return res.status(204).send();
  }
}
