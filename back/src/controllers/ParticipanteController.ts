import { Request, Response } from 'express';
import { prisma } from '../config/database';

export class ParticipanteController {
  static async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const participantes = await prisma.participante.findMany({
        include: {
          presentes: true,
          grupos: {
            include: {
              grupo: true
            }
          }
        }
      });
      return res.json(participantes);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar participantes', error });
    }
  }

  static async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const participante = await prisma.participante.findUnique({
        where: { id },
        include: {
          presentes: true,
          sorteiosFeitos: {
            include: {
              participanteSorteado: {
                select: {
                  id: true,
                  nome: true
                }
              }
            }
          },
          sorteiosRecebidos: true,
          grupos: {
            include: {
              grupo: true
            }
          }
        }
      });
      
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
      const { nome, senha, description, evento } = req.body;
      
      const novoParticipante = await prisma.participante.create({
        data: {
          nome,
          senha,
          description,
          evento,
        }
      });
      
      return res.status(201).json(novoParticipante);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao criar participante', error });
    }
  }

  static async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { nome, senha, description, evento } = req.body;
      
      const participanteAtualizado = await prisma.participante.update({
        where: { id },
        data: {
          nome,
          senha,
          description,
          evento,
        }
      });
      
      return res.json(participanteAtualizado);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao atualizar participante', error });
    }
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      
      await prisma.participante.delete({
        where: { id }
      });
      
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao deletar participante', error });
    }
  }

  // Método para adicionar presente ao participante
  static async addPresente(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params; // id do participante
      const { nome, descricao, imagem } = req.body;
      
      const presente = await prisma.presente.create({
        data: {
          nome,
          descricao,
          imagem,
          participanteId: id!,
        }
      });
      
      return res.status(201).json(presente);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao adicionar presente', error });
    }
  }
}
