export interface EventoType {
  id?: number;
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
  set nome(nome: string) {
    this.props.nome = nome;
  }

  get local(): string {
    return this.props.local;
  }

  set local(local: string) {
    this.props.local = local;
  }

  get dataRealizacao(): string {
    return this.props.dataRealizacao;
  }

  set dataRealizacao(dataRealizacao: string) {
    this.props.dataRealizacao = dataRealizacao;
  }

  get created(): string {
    return this.props.created;
  }

  get updated(): string {
    return this.props.updated;
  }
}
