export interface GrupoSorteio {
  id: string; // UUID
  nome: string;
  participantes: {
    id: string; // UUID7
    nome: string;
    senha?: string | null;
    description?: string | null;
    evento?: string;
    created?: string;
    updated?: string;
  }[];
  sorteios: {
    id_participante: string;
    id_participante_sorteado: string;
  }[];
}
