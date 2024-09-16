import { RespostaPerguntaAtividade } from "./RespostaPerguntaAtividade";

export class RespostaAtividade {
  private id: number | null = null;
  private idAtividade: number;
  private idUsuario: number;
  private nota: number | null = null;
  private respostas: RespostaPerguntaAtividade[];

  public getId() {
    return this.id;
  }

  public setId(id: number) {
    this.id = id;
  }

  public getIdAtividade() {
    return this.idAtividade;
  }

  public setIdAtividade(idAtividade: number) {
    this.idAtividade = idAtividade;
  }

  public getIdUsuario() {
    return this.idUsuario;
  }

  public setIdUsuario(idUsuario: number) {
    this.idUsuario = idUsuario;
  }

  public getNota() {
    return this.nota;
  }

  public setNota(nota: number) {
    this.nota = nota;
  }

  public getRespostas() {
    return this.respostas;
  }

  public setRespostas(respostas: RespostaPerguntaAtividade[]) {
    this.respostas = respostas;
  }
}