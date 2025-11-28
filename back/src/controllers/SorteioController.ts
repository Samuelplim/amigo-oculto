import { Request, Response } from 'express';
import { Sorteio } from '../models/Sorteio';

const sorteios: Sorteio[] = [];

export class SorteioController {
  static async getAll(req: Request, res: Response): Promise<Response> {
    return res.json(sorteios);
  }

  static async getById(req: Request, res: Response): Promise<Response> {
    const sorteio = sorteios.find(s => s.id_participante === req.params.id_participante);
    if (!sorteio) return res.status(404).json({ message: 'Sorteio não encontrado' });
    return res.json(sorteio);
  }

  static async create(req: Request, res: Response) {
    const { id_participante, id_participante_sorteado } = req.body;
    const novoSorteio: Sorteio = {
      id_participante,
      id_participante_sorteado,
    };
    sorteios.push(novoSorteio);
    res.status(201).json(novoSorteio);
  }

  static async update(req: Request, res: Response): Promise<Response> {
    const sorteio = sorteios.find(s => s.id_participante === req.params.id_participante);
    if (!sorteio) return res.status(404).json({ message: 'Sorteio não encontrado' });
    const { data_realizacao, id_participante_sorteado, local } = req.body;
    sorteio.id_participante_sorteado = id_participante_sorteado ?? sorteio.id_participante_sorteado;
    return res.json(sorteio);
  }

  static async delete(req: Request, res: Response) {
    const index = sorteios.findIndex(s => s.id_participante === req.params.id_participante);
    if (index === -1) return res.status(404).json({ message: 'Sorteio não encontrado' });
    sorteios.splice(index, 1);
    return res.status(204).send();
  }
}
