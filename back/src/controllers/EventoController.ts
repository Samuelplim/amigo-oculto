import { Request, Response } from "express";
import { EventosDatabase } from "../database/EventosDatabase";
import { EventoModel } from "../models/EventoModel";

export class EventoController {
  static async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const eventos = await EventosDatabase.findMany();
      return res.json(eventos);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro ao buscar eventos", error });
    }
  }

  static async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const grupo = await EventosDatabase.findById(Number(id));

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

      const evento = new EventoModel({
        nome,
        local,
        dataRealizacao,
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
      });
      const novoGrupo = await EventosDatabase.create(evento);

      return res.status(201).json(novoGrupo);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao criar grupo", error });
    }
  }

  static async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { nome, local, dataRealizacao } = req.body;
      if (!id) {
        return res.status(404).json({ message: "Id não encontrado" });
      }

      const eventoAtualizado = await EventosDatabase.findById(Number(id));
      eventoAtualizado.nome = nome;
      eventoAtualizado.local = local;
      eventoAtualizado.dataRealizacao = dataRealizacao;
      await EventosDatabase.update(eventoAtualizado);

      return res.json(eventoAtualizado);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao atualizar grupo", error });
    }
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const eventoAtualizado = await EventosDatabase.findById(Number(id));
      await EventosDatabase.delete(eventoAtualizado);

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: "Erro ao deletar grupo", error });
    }
  }
}
