import { Request, Response } from 'express';
import { GrupoSorteio } from '../models/GrupoSorteio';
import { v4 as uuidv4 } from 'uuid';

const grupos: GrupoSorteio[] = [];

export class GrupoSorteioController {
  static async getAll(req: Request, res: Response) {
    return res.json(grupos);
  }

  static async getById(req: Request, res: Response) {
    const grupo = grupos.find(g => g.id === req.params.id);
    if (!grupo) return res.status(404).json({ message: 'Grupo não encontrado' });
    return res.json(grupo);
  }

  static async create(req: Request, res: Response) {
    const { nome } = req.body;
    const novoGrupo: GrupoSorteio = {
      id: uuidv4(),
      nome,
      participantes: [],
      sorteios: []
    };
    grupos.push(novoGrupo);
    return res.status(201).json(novoGrupo);
  }

  static async addParticipante(req: Request, res: Response) {
    const grupo = grupos.find(g => g.id === req.params.id);
    if (!grupo) return res.status(404).json({ message: 'Grupo não encontrado' });
    const participante = req.body;
    grupo.participantes.push({ ...participante, id: uuidv4() });
    return res.status(201).json(grupo);
  }

  static async updateParticipante(req: Request, res: Response) {
    const grupo = grupos.find(g => g.id === req.params.id);
    if (!grupo) return res.status(404).json({ message: 'Grupo não encontrado' });
    const participante = grupo.participantes.find(p => p.id === req.params.participanteId);
    if (!participante) return res.status(404).json({ message: 'Participante não encontrado' });
    Object.assign(participante, req.body);
    return res.json(participante);
  }

  static async deleteParticipante(req: Request, res: Response) {
    const grupo = grupos.find(g => g.id === req.params.id);
    if (!grupo) return res.status(404).json({ message: 'Grupo não encontrado' });
    const index = grupo.participantes.findIndex(p => p.id === req.params.participanteId);
    if (index === -1) return res.status(404).json({ message: 'Participante não encontrado' });
    grupo.participantes.splice(index, 1);
    return res.status(204).send();
  }

  static async sortear(req: Request, res: Response) {
    const grupo = grupos.find(g => g.id === req.params.id);
    if (!grupo) return res.status(404).json({ message: 'Grupo não encontrado' });
    // Lógica simples de sorteio: embaralha e associa
    const participantes = [...grupo.participantes];
    if (participantes.length < 2) return res.status(400).json({ message: 'Participantes insuficientes para sortear.' });
    const embaralhado = participantes.sort(() => Math.random() - 0.5);
    grupo.sorteios = embaralhado.map((p, i) => ({
      id_participante: p.id,
      id_participante_sorteado: embaralhado[(i + 1) % embaralhado.length]?.id || ''
    }));
    return res.json(grupo.sorteios);
  }
}
