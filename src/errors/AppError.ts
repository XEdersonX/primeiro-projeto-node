class AppError {
  public readonly message: string;

  public readonly statusCode: number; // Codigo de de erro do http

  // Se tu nao mandar o codigo do erro ele vai mandar o codigo 400 como padrao
  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default AppError;
