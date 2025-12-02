import { Request, Response } from 'express';
import { prisma } from '../config/database';

export class SorteioController {
  static async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const sorteios = await prisma.sorteio.findMany({
        include: {
          grupo: {
            select: {
              id: true,
              nome: true
            }
          },
          participante: {
            select: {
              id: true,
              nome: true
            }
          },
          participanteSorteado: {
            select: {
              id: true,
              nome: true,
              presentes: true
            }
          }
        }
      });
      return res.json(sorteios);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar sorteios', error });
    }
  }

  static async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const sorteio = await prisma.sorteio.findUnique({
        where: { id },
        include: {
          grupo: {
            select: {
              id: true,
              nome: true
            }
          },
          participante: {
            select: {
              id: true,
              nome: true
            }
          },
          participanteSorteado: {
            select: {
              id: true,
              nome: true,
              presentes: true
            }
          }
        }
      });
      
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
      const { grupoId, participanteId, participanteSorteadoId } = req.body;
      
      const novoSorteio = await prisma.sorteio.create({
        data: {
          grupoId: Number(grupoId),
          participanteId,
          participanteSorteadoId
        }
      });
      
      return res.status(201).json(novoSorteio);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao criar sorteio', error });
    }
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      
      await prisma.sorteio.delete({
        where: { id }
      });
      
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao deletar sorteio', error });
    }
  }

  static async getByGrupo(req: Request, res: Response): Promise<Response> {
    try {
      const { grupoId } = req.params;
      
      const sorteios = await prisma.sorteio.findMany({
        where: { grupoId: Number(grupoId) },
        include: {
          participante: {
            select: {
              id: true,
              nome: true
            }
          },
          participanteSorteado: {
            select: {
              id: true,
              nome: true,
              presentes: true
            }
          }
        }
      });
      
      return res.json(sorteios);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar sorteios do grupo', error });
    }
  }
}