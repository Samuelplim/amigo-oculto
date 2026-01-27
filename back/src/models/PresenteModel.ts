export interface PresenteType {
  id?: string;
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
  set participanteId(value: string) {
    this.props.participanteId = value;
  }

  get nome(): string {
    return this.props.nome;
  }

  set nome(value: string) {
    this.props.nome = value;
  }

  get descricao(): string {
    return this.props.descricao;
  }

  set descricao(value: string) {
    this.props.descricao = value;
  }

  get imagem(): string {
    return this.props.imagem;
  }

  set imagem(value: string) {
    this.props.imagem = value;
  }
}
