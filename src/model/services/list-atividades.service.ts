import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/database/PrismaService";
import { Atividade } from "../entities/Atividade";
import { Questao } from "../entities/Questao";

@Injectable()
export class ListAtividadesService {
  constructor(private readonly prisma: PrismaService) {
    
  }

  public async getAtividades() {
    const atividades = await this.prisma.atividade.findMany({
      where: {},
      include: {
        Questao: {}
      }
    })

    return atividades.map(atividade => {
      const entityAtividade = new Atividade()

      entityAtividade.setId(atividade.id);
      entityAtividade.setTitulo(atividade.titulo)
      entityAtividade.setQuestoes(atividade.Questao.map(questao => {
        const entityQuestao = new Questao();
        entityQuestao.setId(questao.id);
        entityQuestao.setPergunta(questao.pergunta)
        return entityQuestao;
      }))

      return entityAtividade;
    })
  }
}