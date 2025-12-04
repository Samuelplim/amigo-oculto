import { Request, Response } from 'express';
import { prisma } from '../config/database';

export class PresenteController {
  static async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const presentes = await prisma.presente.findMany({
        include: {
          participante: {
            select: {
              id: true,
              nome: true
            }
          }
        }
      });
      return res.json(presentes);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar presentes', error });
    }
  }

  static async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const presente = await prisma.presente.findUnique({
        where: { id },
        include: {
          participante: {
            select: {
              id: true,
              nome: true
            }
          }
        }
      });
      
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
      const { nome, descricao, imagem, participanteId } = req.body;
      
      const novoPresente = await prisma.presente.create({
        data: {
          nome,
          descricao,
          imagem,
          participanteId
        }
      });
      
      return res.status(201).json(novoPresente);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao criar presente', error });
    }
  }

  static async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { nome, descricao, imagem } = req.body;
      
      const presenteAtualizado = await prisma.presente.update({
        where: { id },
        data: {
          nome,
          descricao,
          imagem
        }
      });
      
      return res.json(presenteAtualizado);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao atualizar presente', error });
    }
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      
      await prisma.presente.delete({
        where: { id }
      });
      
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao deletar presente', error });
    }
  }
}