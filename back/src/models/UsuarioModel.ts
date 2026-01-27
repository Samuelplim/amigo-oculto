export interface UsuarioType {
  id?: number;
  nome: string;
  senha: string;
}
export class UsuarioModel {
  constructor(private props: UsuarioType) {}

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
  get senha(): string {
    return this.props.senha;
  }
  set senha(senha: string) {
    this.props.senha = senha;
  }
}
