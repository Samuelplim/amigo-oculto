export class AppError {
  public readonly message: string;
  public readonly statusCode: number;
  constructor(props: { message: string; statusCode?: number }) {
    this.message = props.message;
    this.statusCode = props.statusCode || 400;
  }
}
