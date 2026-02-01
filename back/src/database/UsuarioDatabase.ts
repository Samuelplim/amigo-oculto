import { ENV } from "../config/constant";
import { UserModel, UserType } from "../models/UsuarioModel";
import { Database } from "./Databases";

export class UsuarioDatabase extends Database {
  static override tableName = `${ENV.DB_SCHEMA}.usuarios`;
  public static async findMany(): Promise<UserModel[]> {
    return await this.findAll<UserType>().then((users) =>
      users.map((user) => new UserModel(user)),
    );
  }
  public static async findById(id: number): Promise<UserModel> {
    const res = await this.findOneById<UserType>(id);
    return new UserModel(res);
  }
  public static async findByName(nome: string): Promise<UserModel | undefined> {
    const res = await this.table
      .whereILike("nome", nome)
      .first<UserType | undefined>();
    if (!res) {
      return undefined;
    }
    return new UserModel(res);
  }
  public static async create(user: UserModel): Promise<{ id: number }> {
    return await this.insert({
      nome: user.getName(),
      senha: user.getPassword(),
    });
  }
  public static async update(
    user: UserModel,
  ): Promise<{ id: number | string }> {
    return await this.updateById<{ nome: string; senha: string }>({
      data: { nome: user.getName(), senha: user.getPassword() },
      id: user.getId(),
    });
  }
  public static async delete(
    user: UserModel,
  ): Promise<{ id: number | string }> {
    return await this.deleteById(user.getId());
  }
}
