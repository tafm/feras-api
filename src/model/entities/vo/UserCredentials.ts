export class UserCredentials {
  private senha: string;
  private email: string;

  public getSenha(): string {
    return this.senha;
  }

  public getEmail(): string {
    return this.email
  }

  public setSenha(senha: string) {
    this.senha = senha;
  }

  public setEmail(email: string) {
    this.email = email;
  }
}