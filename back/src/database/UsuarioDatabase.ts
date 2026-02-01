import { ENV } from "../config/constant";
import { UserModel, UserType } from "../models/UsuarioModel";
import { Database } from "./Databases";

interface DataUsuario {
  id: number;
  nome: string;
  senha: string;
  email: string;
}
export class UsuarioDatabase extends Database {
  static override tableName = `${ENV.DB_SCHEMA}.usuarios`;
  public static async findMany(): Promise<UserModel[]> {
    return await this.findAll<UserType>().then((users) =>
      users.map((user) => new UserModel(user)),
    );
  }
  public static async findById(id: number): Promise<UserModel> {
    const res = await this.findOneById<DataUsuario>(id);
    return new UserModel({
      id: res.id,
      name: res.nome,
      pasword: res.senha,
      email: res.email,
    });
  }
  public static async findByName(nome: string): Promise<UserModel | undefined> {
    const res = await this.table
      .whereILike("nome", nome)
      .first<DataUsuario | undefined>();
    if (!res) {
      return undefined;
    }
    return new UserModel({
      id: res.id,
      name: res.nome,
      pasword: res.senha,
      email: res.email,
    });
  }
  public static async findByEmail(
    email: string,
  ): Promise<UserModel | undefined> {
    const res = await this.table
      .whereILike("email", email)
      .first<DataUsuario | undefined>();
    if (!res) {
      return undefined;
    }
    return new UserModel({
      id: res.id,
      name: res.nome,
      pasword: res.senha,
      email: res.email,
    });
  }
  public static async create(user: UserModel): Promise<{ id: number }> {
    return await this.insert({
      nome: user.getName(),
      senha: user.getPassword(),
      email: user.getEmail(),
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
