export interface EventoType {
  id: number;
  nome: string;
  local: string;
  dataRealizacao: string;
  created: string;
  updated: string;
}
export class EventoModel {
  constructor(private props: EventoType) {}

  get id(): number {
    if (this.props.id === undefined) throw new Error("Method not implemented.");
    return this.props.id;
  }

  get nome(): string {
    return this.props.nome;
  }

  get local(): string {
    return this.props.local;
  }

  get dataRealizacao(): string {
    return this.props.dataRealizacao;
  }

  get created(): string {
    return this.props.created;
  }

  get updated(): string {
    return this.props.updated;
  }
}
