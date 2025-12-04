import { Model } from "./Model";
interface EventoType {
  id: number;
  nome: string;
  created: string;
  updated: string;
}
class EventosModel extends Model {
  protected tableName = "users";
}
