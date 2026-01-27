import { Request, Response } from "express";
import { PresenteDatabase } from "../database/PresenteDatabase";
import { PresenteModel } from "../models/PresenteModel";

export class PresenteController {
  static async getByParticipantId(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(404).json({ message: "Id não encontrado" });
      }
      const presente = await PresenteDatabase.findByParticipanteId(id);
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
      const presente = await PresenteDatabase.findById(Number(id));

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
      const presente = new PresenteModel({
        descricao,
        imagem,
        nome,
        participanteId,
      });
      const novoPresente = await PresenteDatabase.create(presente);

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

      const presenteAtualizado = await PresenteDatabase.findById(Number(id));
      presenteAtualizado.descricao = descricao;
      presenteAtualizado.imagem = imagem;
      presenteAtualizado.nome = nome;

      await PresenteDatabase.update(presenteAtualizado);

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
      const presenteAtualizado = await PresenteDatabase.findById(Number(id));
      await PresenteDatabase.delete(presenteAtualizado);

      return res.status(204).send();
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao deletar presente", error });
    }
  }
}
