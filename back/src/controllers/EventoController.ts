import { Request, Response } from "express";
import { EventosModel } from "../models/Eventos";

export class EventoController {
  static async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const grupos = await EventosModel.findMany();
      return res.json(grupos);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar grupos", error });
    }
  }

  static async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const grupo = await EventosModel.findById(Number(id));

      if (!grupo) {
        return res.status(404).json({ message: "Grupo não encontrado" });
      }

      return res.json(grupo);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar grupo", error });
    }
  }

  static async create(req: Request, res: Response): Promise<Response> {
    try {
      const { nome, local, dataRealizacao } = req.body;

      const novoGrupo = await EventosModel.create({
        nome,
        local,
        dataRealizacao,
      });

      return res.status(201).json(novoGrupo);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao criar grupo", error });
    }
  }

  static async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { nome, local, dataRealizacao } = req.body;

      const grupoAtualizado = await EventosModel.update({
        id: Number(id),
        data: {
          nome,
          local,
          dataRealizacao,
        },
      });

      return res.json(grupoAtualizado);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao atualizar grupo", error });
    }
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      await EventosModel.delete({ id: Number(id) });

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: "Erro ao deletar grupo", error });
    }
  }
}
