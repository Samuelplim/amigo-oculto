import { Request, Response } from "express";
import { ParticipanteModel } from "../models/Participante";

export class ParticipanteController {
  static async getByEventoId(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(404).json({ message: "Id não informado" });
      }
      const participantes = await ParticipanteModel.findByEventoId(Number(id));
      return res.json(participantes);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao buscar participantes", error });
    }
  }

  static async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(404).json({ message: "Id não informado" });
      }
      const participante = await ParticipanteModel.findById(id);

      if (!participante) {
        return res.status(404).json({ message: "Participante não encontrado" });
      }

      return res.json(participante);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao buscar participante", error });
    }
  }

  static async create(req: Request, res: Response): Promise<Response> {
    try {
      const { nome, senha, description, eventoId } = req.body;

      const novoParticipante = await ParticipanteModel.create({
        nome,
        senha,
        description,
        eventoId,
      });

      return res.status(201).json(novoParticipante);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao criar participante", error });
    }
  }

  static async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { nome, senha, description, evento } = req.body;

      const participanteAtualizado = await ParticipanteModel.update({
        id: Number(id),
        data: {
          nome,
          senha,
          description,
        },
      });

      return res.json(participanteAtualizado);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao atualizar participante", error });
    }
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(404).json({ message: "Id não fornecido" });
      }
      await ParticipanteModel.delete(id);

      return res.status(204).send();
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao deletar participante", error });
    }
  }
}
