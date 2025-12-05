import { Model } from "./Model";
interface PresenteType {
  id: string;
  nome: string;
  descricao: string;
  imagem: string;
  participanteId: string;
}
export class PresenteModel extends Model {
  static override tableName = "amigos.presentes";

  public static async create(presente: {
    nome: string;
    descricao: string;
    imagem: string;
    participanteId: string;
  }): Promise<{ id: number }> {
    return await this.insert(presente);
  }
  public static async findById(id: number): Promise<PresenteType> {
    return await this.findOneById<PresenteType>(id);
  }
  public static async findByParticipanteId(
    participanteId: string
  ): Promise<PresenteType[]> {
    return this.table.where("participanteId", participanteId).select("*");
  }
  public static async update(props: {
    data: { nome: string; descricao: string; imagem: string };
    id: string;
  }): Promise<{ id: number | string }> {
    return await this.updateById({ data: props.data, id: props.id });
  }
  public static async delete(props: {
    id: string;
  }): Promise<{ id: number | string }> {
    return await this.deleteById(props.id);
  }
}
