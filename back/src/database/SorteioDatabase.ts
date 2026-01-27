import { SorteioModel, SorteioType } from "../models/SorteioModel";
import { Database } from "./Databases";

export class SorteioDatabase extends Database {
  static override tableName = "amigos.sorteios";
  public static async findMany(): Promise<SorteioModel[]> {
    return await this.findAll<SorteioType[]>();
  }
  public static async findById(id: number): Promise<SorteioModel> {
    return await this.findOneById<SorteioType>(id);
  }
  public static async findByEventoId(
    eventoId: number,
  ): Promise<SorteioModel[]> {
    return this.table.where("eventoId", eventoId).select("*");
  }
  public static async findByEventoIdAndParticipante(props: {
    eventoId: number;
    participanteId: string;
  }): Promise<SorteioModel[]> {
    return this.table
      .where("eventoId", props.eventoId)
      .where("participanteId", props.participanteId)
      .select("*")
      .innerJoin(
        "participantes",
        "sorteios.participanteId",
        "participantes.id",
      );
  }
  public static async create(props: {
    participanteId: string;
    participanteSorteadoId: string;
    eventoId: number;
  }): Promise<{ id: number }> {
    return await this.insert<{
      participanteId: string;
      participanteSorteadoId: string;
      eventoId: number;
    }>(props);
  }
  public static async createMany(
    props: {
      participanteId: string;
      participanteSorteadoId: string;
      eventoId: number;
    }[],
  ): Promise<{ id: number }> {
    return await this.insert(props);
  }
  public static async delete(props: {
    id: number;
  }): Promise<{ id: number | string }> {
    return await this.deleteById(props.id);
  }
}
