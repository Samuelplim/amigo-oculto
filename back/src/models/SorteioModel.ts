export interface SorteioType {
  id?: string;
  participanteId: string;
  participanteSorteadoId: string;
  eventoId: number;
  created: string;
}
export class SorteioModel {
  constructor(private props: SorteioType) {}

  get id(): string {
    if (this.props.id === undefined) throw new Error("Method not implemented.");
    return this.props.id;
  }

  get participanteId(): string {
    return this.props.participanteId;
  }

  get participanteSorteadoId(): string {
    return this.props.participanteSorteadoId;
  }

  get eventoId(): number {
    return this.props.eventoId;
  }

  get created(): string {
    return this.props.created;
  }
}
