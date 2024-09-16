export class RespostaPerguntaAtividade {
  private perguntaId: number;
  private resposta: string;

  public getPerguntaId() {
    return this.perguntaId;
  }

  public setPerguntaId(perguntaId: number) {
    this.perguntaId = perguntaId;
  }

  public getResposta() {
    return this.resposta;
  }

  public setResposta(resposta: string) {
    this.resposta = resposta;
  }
}