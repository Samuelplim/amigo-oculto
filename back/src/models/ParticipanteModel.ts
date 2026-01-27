export interface ParticipanteType {
  id: string;
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

  get senha(): string {
    return this.props.senha;
  }

  get description(): string {
    return this.props.description;
  }

  get created(): string {
    return this.props.created;
  }

  get updated(): string {
    return this.props.updated;
  }

  get eventoId(): number {
    return this.props.eventoId;
  }
}
