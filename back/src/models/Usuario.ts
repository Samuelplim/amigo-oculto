import { Model } from "./Model";
interface UsuarioType {
  id: number;
  nome: string;
  senha: string;
}
export class UsuarioModel extends Model {
  static override tableName = "amigos.usuarios";
  public static async findMany(): Promise<UsuarioType[]> {
    return await this.findAll<UsuarioType>();
  }
  public static async findById(id: number): Promise<UsuarioType> {
    return await this.findOneById<UsuarioType>(id);
  }
  public static async create(props: {
    nome: string;
    senha: string;
  }): Promise<{ id: number }> {
    return await this.insert(props);
  }
  public static async update(props: {
    data: { nome: string; senha: string };
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
