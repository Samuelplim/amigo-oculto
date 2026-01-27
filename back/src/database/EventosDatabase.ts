import { Database } from "./Databases";

interface EventoType {
  id: number;
  nome: string;
  local: string;
  dataRealizacao: string;
  created: string;
  updated: string;
}
export class EventosDatabase extends Database {
  static override tableName: string = "amigos.eventos";
  public static async findMany(): Promise<EventoType[]> {
    return await this.findAll<EventoType>();
  }
  public static async findById(id: number): Promise<EventoType> {
    return await this.findOneById<EventoType>(id);
  }
  public static async create(props: {
    nome: string;
    local: string;
    dataRealizacao: string;
  }): Promise<{ id: number }> {
    return await this.insert(props);
  }
  public static async update(props: {
    data: { nome: string; local: string; dataRealizacao: string };
    id: number;
  }): Promise<{ id: number | string }> {
    return await this.updateById({ data: props.data, id: props.id });
  }
  public static async delete(props: {
    id: number;
  }): Promise<{ id: number | string }> {
    return await this.deleteById(props.id);
  }
}
