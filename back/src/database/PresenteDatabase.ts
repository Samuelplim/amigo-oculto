import { PresenteModel, PresenteType } from "../models/PresenteModel";
import { Database } from "./Databases";

export class PresenteDatabase extends Database {
  static override tableName = "amigos.presentes";

  public static async create(presente: PresenteModel): Promise<{ id: number }> {
    return await this.insert({
      nome: presente.nome,
      descricao: presente.descricao,
      imagem: presente.imagem,
      participanteId: presente.participanteId,
    });
  }
  public static async findById(id: number): Promise<PresenteModel> {
    const presente = await this.findOneById<PresenteType>(id);
    return new PresenteModel(presente);
  }
  public static async findByParticipanteId(
    participanteId: string,
  ): Promise<PresenteModel[]> {
    const presentes = await this.table
      .where("participanteId", participanteId)
      .select("*");
    return presentes.map((presente) => new PresenteModel(presente));
  }
  public static async update(
    presente: PresenteModel,
  ): Promise<{ id: number | string }> {
    return await this.updateById<{
      nome: string;
      descricao: string;
      imagem: string;
    }>({ data: presente, id: presente.id });
  }
  public static async delete(
    presente: PresenteModel,
  ): Promise<{ id: number | string }> {
    return await this.deleteById(presente.id);
  }
}
