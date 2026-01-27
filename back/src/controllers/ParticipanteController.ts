import { Request, Response } from "express";
import { ParticipanteDatabase } from "../database/ParticipanteDatabase";
import { ParticipanteModel } from "../models/ParticipanteModel";

export class ParticipanteController {
  static async getByEventoId(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(404).json({ message: "Id não informado" });
      }
      const participantes = await ParticipanteDatabase.findByEventoId(
        Number(id),
      );
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
      const participante = await ParticipanteDatabase.findById(id);

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

      const participante = new ParticipanteModel({
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
        nome,
        description,
        senha,
        eventoId,
      });

      const novoParticipante = await ParticipanteDatabase.create(participante);

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

      if (!id) {
        return res.status(404).json({ message: "Id não encontrado" });
      }

      const participanteAtualizado = await ParticipanteDatabase.findById(id);
      participanteAtualizado.nome = nome;
      participanteAtualizado.senha = senha;
      participanteAtualizado.description = description;
      await ParticipanteDatabase.update(participanteAtualizado);

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
      const participante = await ParticipanteDatabase.findById(id);
      await ParticipanteDatabase.delete(participante);

      return res.status(204).send();
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao deletar participante", error });
    }
  }
}
