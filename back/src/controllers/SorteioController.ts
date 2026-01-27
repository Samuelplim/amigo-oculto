import { Request, Response } from "express";
import { SorteioDatabase } from "../database/SorteioDatabase";
import { ParticipanteDatabase } from "../database/ParticipanteDatabase";

export class SorteioController {
  static async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const sorteio = await SorteioDatabase.findById(Number(id));

      if (!sorteio) {
        return res.status(404).json({ message: "Sorteio não encontrado" });
      }

      return res.json(sorteio);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar sorteio", error });
    }
  }

  static async create(req: Request, res: Response): Promise<Response> {
    try {
      const { eventoId, participanteId, participanteSorteadoId } = req.body;

      const novoSorteio = await SorteioDatabase.create({
        eventoId,
        participanteId,
        participanteSorteadoId,
      });

      return res.status(201).json(novoSorteio);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao criar sorteio", error });
    }
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      await SorteioDatabase.delete({ id: Number(id) });

      return res.status(204).send();
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao deletar sorteio", error });
    }
  }

  static async getByEventoId(req: Request, res: Response): Promise<Response> {
    try {
      const { eventoId } = req.params;
      if (!eventoId) {
        return res.status(404).json({ message: "eventoId não informado" });
      }
      const sorteios = await SorteioDatabase.findByEventoId(Number(eventoId));

      return res.json(sorteios);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao buscar sorteios do grupo", error });
    }
  }

  static async realizarSorteio(req: Request, res: Response): Promise<Response> {
    try {
      const eventoId = Number(req.params.eventoId);
      if (!eventoId) {
        return res.status(404).json({ message: "eventoId não informado" });
      }
      const participantes = await ParticipanteDatabase.findByEventoId(
        Number(eventoId),
      );
      if (!participantes) {
        return res.status(404).json({ message: "Grupo não encontrado" });
      }
      if (participantes.length < 2) {
        return res.status(400).json({
          message:
            "É necessário pelo menos 2 participantes para realizar o sorteio",
        });
      }
      const sorteiosRealizados = await SorteioDatabase.findByEventoId(
        Number(eventoId),
      );
      if (sorteiosRealizados.length > 0) {
        return res
          .status(400)
          .json({ message: "Sorteio já foi realizado para este grupo" });
      }
      const desarranjo = [...participantes];
      ParticipanteDatabase.sort(desarranjo);
      // Salvar sorteios no banco
      const sorteiosData = desarranjo.map((participante, index, array) => {
        if (array.length - 1 === index) {
          const primeiroSorteado = array[0];
          if (!primeiroSorteado) {
            throw new Error("Erro ao realizar sorteio");
          }

          return {
            eventoId,
            participanteId: participante.id,
            participanteSorteadoId: primeiroSorteado.id,
          };
        }
        const proximoSorteado = array[index + 1];
        if (!proximoSorteado) {
          throw new Error("Erro ao realizar sorteio");
        }
        return {
          eventoId,
          participanteId: participante.id,
          participanteSorteadoId: proximoSorteado.id,
        };
      });

      const grupoRealizado = await SorteioDatabase.createMany(sorteiosData);

      return res.json(grupoRealizado);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao realizar sorteio", error });
    }
  }

  static async getSorteioParticipante(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const { eventoId, participanteId } = req.params;

      if (!eventoId || !participanteId) {
        return res
          .status(404)
          .json({ message: "eventoId ou participanteId não informado" });
      }
      const sorteio = await SorteioDatabase.findByEventoIdAndParticipante({
        eventoId: Number(eventoId),
        participanteId,
      });

      if (!sorteio) {
        return res
          .status(404)
          .json({ message: "Sorteio não encontrado para este participante" });
      }

      return res.json(sorteio);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar sorteio", error });
    }
  }
}
