import { Request, Response } from "express";
import { PresenteModel } from "../models/Presente";

export class PresenteController {
  static async getByParticipantId(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(404).json({ message: "Id não encontrado" });
      }
      const presente = await PresenteModel.findByParticipanteId(id);
      return res.json(presente);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao buscar presente", error });
    }
  }
  static async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const presente = await PresenteModel.findById(Number(id));

      if (!presente) {
        return res.status(404).json({ message: "Presente não encontrado" });
      }

      return res.json(presente);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao buscar presente", error });
    }
  }

  static async create(req: Request, res: Response): Promise<Response> {
    try {
      const { nome, descricao, imagem, participanteId } = req.body;

      const novoPresente = await PresenteModel.create({
        nome,
        descricao,
        imagem,
        participanteId,
      });

      return res.status(201).json(novoPresente);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao criar presente", error });
    }
  }

  static async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { nome, descricao, imagem } = req.body;
      if (!id) {
        return res.status(404).json({ message: "Id não encontrado" });
      }

      const presenteAtualizado = await PresenteModel.update({
        id: id,
        data: {
          nome,
          descricao,
          imagem,
        },
      });

      return res.json(presenteAtualizado);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao atualizar presente", error });
    }
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(404).json({ message: "Id não encontrado" });
      }
      await PresenteModel.delete({ id });

      return res.status(204).send();
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao deletar presente", error });
    }
  }
}
