import { ENV } from "../config/constant";
import {
  ParticipanteModel,
  ParticipanteType,
} from "../models/ParticipanteModel";
import { Database } from "./Databases";

export class ParticipanteDatabase extends Database {
  static override tableName = `${ENV.DB_SCHEMA}.participantes`;

  public static async findById(id: string): Promise<ParticipanteModel> {
    const result = await this.findOneById<ParticipanteType>(id);
    return new ParticipanteModel(result);
  }
  public static async findByEventoId(id: number): Promise<ParticipanteModel[]> {
    const result = await this.table
      .where("eventoId", id)
      .select<ParticipanteType[]>("*");
    return result.map((item) => new ParticipanteModel(item));
  }
  public static async create(
    props: ParticipanteModel,
  ): Promise<{ id: number }> {
    return await this.insert({
      nome: props.nome,
      senha: props.senha,
      description: props.description,
      eventoId: props.eventoId,
      updated: props.updated,
      created: props.created,
    });
  }

  public static async update(
    props: ParticipanteModel,
  ): Promise<{ id: number | string }> {
    return await this.updateById<{
      nome: string;
      senha: string;
      description: string;
    }>({
      data: {
        description: props.description,
        nome: props.nome,
        senha: props.senha,
      },
      id: props.id,
    });
  }
  public static async delete(
    props: ParticipanteModel,
  ): Promise<{ id: number | string }> {
    return await this.deleteById(props.id);
  }

  /* Fisher–Yates */
  static sort(participantes: ParticipanteModel[]) {
    for (let i = participantes.length - 1; i > 0; i--) {
      const random = Math.floor(Math.random() * (i + 1));
      const temp: ParticipanteModel = participantes[i]!;
      participantes[i] = participantes[random]!;
      participantes[random] = temp;
    }
  }
}
