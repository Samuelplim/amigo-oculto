export interface Participante {
  id: string; // UUID7
  nome: string;
  senha?: string | null;
  description?: string | null;
  id_participante: string; // UUID7
  evento: string;
  created: string;
  updated: string;
}
