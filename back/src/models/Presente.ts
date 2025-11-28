export interface Presente {
  id: string; // UUID7
  nome: string;
  id_participante: string; // UUID7
  descricao?: string | null;
  imagem?: string | null;
}
