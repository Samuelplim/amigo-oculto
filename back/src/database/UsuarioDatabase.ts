import { UsuarioModel, UsuarioType } from "../models/UsuarioModel";
import { Database } from "./Databases";

export class UsuarioDatabase extends Database {
  static override tableName = "public.usuarios";
  public static async findMany(): Promise<UsuarioModel[]> {
    return await this.findAll<UsuarioType>().then((users) =>
      users.map((user) => new UsuarioModel(user)),
    );
  }
  public static async findById(id: number): Promise<UsuarioModel> {
    const res = await this.findOneById<UsuarioType>(id);
    return new UsuarioModel(res);
  }
  public static async findByName(nome: string): Promise<UsuarioModel> {
    const res = await this.table.whereILike("nome", nome).first<UsuarioType>();
    return new UsuarioModel(res);
  }
  public static async create(user: UsuarioModel): Promise<{ id: number }> {
    return await this.insert({ nome: user.nome, senha: user.senha });
  }
  public static async update(
    user: UsuarioModel,
  ): Promise<{ id: number | string }> {
    return await this.updateById<{ nome: string; senha: string }>({
      data: { nome: user.nome, senha: user.senha },
      id: user.id,
    });
  }
  public static async delete(
    user: UsuarioModel,
  ): Promise<{ id: number | string }> {
    return await this.deleteById(user.id);
  }
}
