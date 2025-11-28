import { Request, Response } from 'express';
import { Presente } from '../models/Presente';

const presentes: Presente[] = [];

export class PresenteController {
  static async getAll(req: Request, res: Response) {
    res.json(presentes);
  }

  static async getById(req: Request, res: Response): Promise<Response> {
    const presente = presentes.find(p => p.id === req.params.id);
    if (!presente) return res.status(404).json({ message: 'Presente não encontrado' });
    return res.json(presente);
  }

  static async create(req: Request, res: Response) {
    const { nome, id_participante } = req.body;
    const novoPresente: Presente = {
      id: crypto.randomUUID(),
      nome,
      id_participante
    };
    presentes.push(novoPresente);
    res.status(201).json(novoPresente);
  }

  static async update(req: Request, res: Response): Promise<Response> {
    const presente = presentes.find(p => p.id === req.params.id);
    if (!presente) return res.status(404).json({ message: 'Presente não encontrado' });
    const { nome, id_participante } = req.body;
    presente.nome = nome ?? presente.nome;
    presente.id_participante = id_participante ?? presente.id_participante;
    return res.json(presente);
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    const index = presentes.findIndex(p => p.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Presente não encontrado' });
    presentes.splice(index, 1);
    return res.status(204).send();
  }
}
