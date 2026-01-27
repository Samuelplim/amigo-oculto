export interface ParticipanteType {
  id?: string;
  nome: string;
  senha: string;
  description: string;
  created: string;
  updated: string;
  eventoId: number;
}
export class ParticipanteModel {
  constructor(private props: ParticipanteType) {}

  get id(): string {
    if (this.props.id === undefined) throw new Error("Method not implemented.");
    return this.props.id;
  }

  get nome(): string {
    return this.props.nome;
  }
  set nome(value: string) {
    this.props.nome = value;
  }

  get senha(): string {
    return this.props.senha;
  }

  set senha(value: string) {
    this.props.senha = value;
  }

  get description(): string {
    return this.props.description;
  }

  set description(value: string) {
    this.props.description = value;
  }

  get created(): string {
    return this.props.created;
  }

  get updated(): string {
    return this.props.updated;
  }

  set updated(value: string) {
    this.props.updated = value;
  }

  get eventoId(): number {
    return this.props.eventoId;
  }
}
