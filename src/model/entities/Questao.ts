export class Questao {
  private id: number | null = null;
  private pergunta: string;

  public getId() {
    return this.id;
  }

  public setId(id: number) {
    this.id = id;
  }

  public getPergunta() {
    return this.pergunta;
  }

  public setPergunta(pergunta: string) {
    this.pergunta = pergunta;
  }
}