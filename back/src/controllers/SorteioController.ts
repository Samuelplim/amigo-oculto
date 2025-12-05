import { Request, Response } from "express";
import { SorteioModel } from "../models/Sorteio";

export class SorteioController {
  static async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const sorteio = await SorteioModel.findById(Number(id));

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

      const novoSorteio = await SorteioModel.create({
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

      await SorteioModel.delete({ id: Number(id) });

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
      const sorteios = await SorteioModel.findByEventoId(Number(eventoId));

      return res.json(sorteios);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao buscar sorteios do grupo", error });
    }
  }

  static async realizarSorteio(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params; // id do grupo

      // Buscar todos os participantes do grupo
      const grupo = await prisma.evento.findUnique({
        where: { id: Number(id) },
        include: {
          participantes: {
            include: {
              participante: true,
            },
          },
          sorteios: true,
        },
      });

      if (!grupo) {
        return res.status(404).json({ message: "Grupo não encontrado" });
      }

      if (grupo.sorteios.length > 0) {
        return res
          .status(400)
          .json({ message: "Sorteio já foi realizado para este grupo" });
      }

      const participantes = grupo.participantes.map(
        (gp: any) => gp.participante
      );

      if (participantes.length < 2) {
        return res.status(400).json({
          message:
            "É necessário pelo menos 2 participantes para realizar o sorteio",
        });
      }

      // Algoritmo de sorteio
      const sorteados = [...participantes];
      let sorteioValido = false;
      let tentativas = 0;
      const maxTentativas = 100;

      while (!sorteioValido && tentativas < maxTentativas) {
        // Embaralhar array de sorteados
        for (let i = sorteados.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [sorteados[i], sorteados[j]] = [sorteados[j], sorteados[i]];
        }

        // Verificar se ninguém tirou a si mesmo
        sorteioValido = participantes.every(
          (p: any, index: number) => p.id !== sorteados[index].id
        );
        tentativas++;
      }

      if (!sorteioValido) {
        return res
          .status(500)
          .json({ message: "Não foi possível realizar um sorteio válido" });
      }

      // Salvar sorteios no banco
      const sorteiosData = participantes.map(
        (participante: any, index: number) => ({
          grupoId: Number(id!),
          participanteId: participante.id,
          participanteSorteadoId: sorteados[index].id,
        })
      );

      await prisma.sorteio.createMany({
        data: sorteiosData,
      });

      const grupoAtualizado = await prisma.evento.findUnique({
        where: { id: Number(id) },
        include: {
          participantes: {
            include: {
              participante: true,
            },
          },
          sorteios: {
            include: {
              participante: {
                select: {
                  id: true,
                  nome: true,
                },
              },
              participanteSorteado: {
                select: {
                  id: true,
                  nome: true,
                },
              },
            },
          },
        },
      });

      return res.json(grupoAtualizado);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao realizar sorteio", error });
    }
  }

  static async getSorteioParticipante(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { id, participanteId } = req.params;

      const sorteio = await prisma.sorteio.findUnique({
        where: {
          grupoId_participanteId: {
            grupoId: Number(id!),
            participanteId: participanteId!,
          },
        },
        include: {
          participanteSorteado: {
            select: {
              id: true,
              nome: true,
              presentes: true,
            },
          },
        },
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
