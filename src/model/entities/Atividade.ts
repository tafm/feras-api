import { Questao } from "./Questao";

export class Atividade {
  private id: number | null = null;
  private titulo: string;
  private questoes: Questao[]

  public getId() {
    return this.id;
  }

  public setId(id: number) {
    this.id = id;
  }

  public getTitulo() {
    return this.titulo;
  }

  public setTitulo(titulo: string) {
    this.titulo = titulo;
  }

  public getQuestoes() {
    return this.questoes;
  }

  public setQuestoes(questoes: Questao[]) {
    this.questoes = questoes;
  }
}