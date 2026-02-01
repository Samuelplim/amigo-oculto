import { ENV } from "../config/constant";
import { EventoModel, EventoType } from "../models/EventoModel";
import { Database } from "./Databases";

export class EventosDatabase extends Database {
  static override tableName: string = `${ENV.DB_SCHEMA}.eventos`;
  public static async findMany(): Promise<EventoModel[]> {
    const eventos = await this.findAll<EventoType>();
    return eventos.map((evento) => new EventoModel(evento));
  }
  public static async findById(id: number): Promise<EventoModel> {
    const evento = await this.findOneById<EventoType>(id);
    return new EventoModel(evento);
  }
  public static async create(props: EventoModel): Promise<{ id: number }> {
    return await this.insert({
      nome: props.nome,
      local: props.local,
      dataRealizacao: props.dataRealizacao,
    });
  }
  public static async update(
    props: EventoModel,
  ): Promise<{ id: number | string }> {
    return await this.updateById<{
      nome: string;
      local: string;
      dataRealizacao: string;
    }>({
      data: {
        nome: props.nome,
        local: props.local,
        dataRealizacao: props.dataRealizacao,
      },
      id: props.id,
    });
  }
  public static async delete(
    props: EventoModel,
  ): Promise<{ id: number | string }> {
    return await this.deleteById(props.id);
  }
}
