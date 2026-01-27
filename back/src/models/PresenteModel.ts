export interface PresenteType {
  id: string;
  nome: string;
  descricao: string;
  imagem: string;
  participanteId: string;
}
export class PresenteModel {
  constructor(private props: PresenteType) {}

  get id(): string {
    if (this.props.id === undefined) throw new Error("Method not implemented.");
    return this.props.id;
  }

  get participanteId(): string {
    return this.props.participanteId;
  }

  get nome(): string {
    return this.props.nome;
  }

  get descricao(): string {
    return this.props.descricao;
  }

  get imagem(): string {
    return this.props.imagem;
  }
}
