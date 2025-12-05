import { connection } from "../config/knexfile";
interface ById<Payload> {
  data: Payload;
  id: number | string;
}
export abstract class Model {
  static tableName: string;

  protected static get table() {
    if (!this.tableName) {
      throw new Error(
        `The table name must be defined for the model ${
          this.tableName
        }. ClassName ${(this as any).name}`
      );
    }
    return connection(this.tableName as string);
  }
  protected static async insert<Payload>(data: Payload): Promise<{
    id: number;
  }> {
    const [result] = await this.table.insert(data).returning("id");
    return result;
  }

  protected static async findOneById<Result>(
    id: number | string
  ): Promise<Result> {
    return this.table.where("id", id).select("*").first();
  }

  protected static async updateById<Payload>(data: ById<Payload>): Promise<{
    id: number | string;
  }> {
    return this.table.where("id", data.id).update(data.data).returning("id");
  }
  protected static async deleteById(id: number | string): Promise<{
    id: number | string;
  }> {
    return this.table.where("id", id).delete().returning("id");
  }

  protected static async findAll<Item>(): Promise<Item[]> {
    return this.table.select("*");
  }
}
