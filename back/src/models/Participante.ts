import { Model } from "./Model";
interface ParticipanteType {
  id: string;
  nome: string;
  senha: string;
  description: string;
  created: string;
  updated: string;
  eventoId: number;
}
export class ParticipanteModel extends Model {
  protected tableName = "participantes";

  public static async findById(id: string): Promise<ParticipanteType> {
    return await this.findOneById<ParticipanteType>(id);
  }
  public static async findByEventoId(id: number): Promise<ParticipanteType[]> {
    return await this.table
      .where("eventoId", id)
      .select<ParticipanteType[]>("*");
  }
  public static async create(props: {
    nome: string;
    senha: string;
    description: string;
    eventoId: number;
  }): Promise<{ id: number }> {
    return await this.insert(props);
  }

  public static async update(props: {
    data: {
      nome: string;
      senha: string;
      description: string;
    };
    id: number;
  }): Promise<{ id: number | string }> {
    return await this.updateById(props);
  }
  public static async delete(id: string): Promise<{ id: number | string }> {
    return await this.deleteById(id);
  }
}
