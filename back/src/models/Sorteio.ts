import { Model } from "./Model";

interface SorteioType {
  id: string;
  participanteId: string;
  participanteSorteadoId: string;
  eventoId: number;
  created: string;
}
export class SorteioModel extends Model {
  protected tableName = "sorteios";
  public static async findMany(): Promise<SorteioType[]> {
    return await this.findAll<SorteioType>();
  }
  public static async findById(id: number): Promise<SorteioType> {
    return await this.findOneById<SorteioType>(id);
  }
  public static async findByEventoId(eventoId: number): Promise<SorteioType[]> {
    return this.table.where("eventoId", eventoId).select("*");
  }

  public static async create(props: {
    participanteId: string;
    participanteSorteadoId: string;
    eventoId: string;
  }): Promise<{ id: number }> {
    return await this.insert(props);
  }
  public static async delete(props: {
    id: number;
  }): Promise<{ id: number | string }> {
    return await this.deleteById(props.id);
  }
}
