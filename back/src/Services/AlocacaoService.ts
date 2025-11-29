export type SalaSorteio = {
  id: number;
  participantes: string[];
};

export function alocarGrupos(participantes: string[]): SalaSorteio[] {
  const salas: SalaSorteio[] = [];
  let salaId = 1;
  for (let i = 0; i < participantes.length; i += 50) {
    const grupo = participantes.slice(i, i + 50);
    salas.push({
      id: salaId++,
      participantes: grupo,
    });
  }
  return salas;
}
