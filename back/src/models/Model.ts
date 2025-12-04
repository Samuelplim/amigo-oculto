import { connection } from "../config/knexfile";
interface Ao<Iu> {
  data: Iu;
  id: number;
}
export abstract class Model {
  protected static tableName?: string;

  protected static get table() {
    if (!this.tableName) {
      throw new Error("The table name must be defined for the model.");
    }
    return connection(this.tableName);
  }
  protected static async insert<Payload>(data: Payload): Promise<{
    id: number;
  }> {
    const [result] = await this.table.insert(data).returning("id");
    return result;
  }

  protected static async findOneById<Result>(id: number): Promise<Result> {
    return this.table.where("id", id).select("*").first();
  }
  protected static async updateById<Ao>(data: Ao): Promise<{
    id: number;
  }> {
    return this.table.where("id", data.id).update(data.data).returning("id");
  }

  protected static async findAll<Item>(): Promise<Item[]> {
    return this.table.select("*");
  }
}
