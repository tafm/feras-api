import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/database/PrismaService";
import { RespostaAtividade } from "../entities/RespostaAtividade";
import { RespostaPerguntaAtividade } from "../entities/RespostaPerguntaAtividade";

@Injectable()
export class ListAtividadesDevolvidasService {
  constructor(private readonly prisma: PrismaService) {
    
  }
  
  public async listAtividadesDevolvidas(alunoId?: number) {
    const atividadesFind = await this.prisma.respostaAtividade.findMany({
      where: {
        userId: alunoId ? alunoId : undefined,
      },
      include: {
        RespostaQuestao: {}
      }
    })

    return atividadesFind.map(respostaAtividade => {
      const entityRespostaAtividade = new RespostaAtividade();

      entityRespostaAtividade.setId(respostaAtividade.id);
      entityRespostaAtividade.setIdUsuario(respostaAtividade.userId);
      entityRespostaAtividade.setNota(respostaAtividade.nota);
      entityRespostaAtividade.setIdAtividade(respostaAtividade.atividadeId);
      entityRespostaAtividade.setRespostas(respostaAtividade.RespostaQuestao.map(resQuestao => {
        const entityResPerguntaAtividade = new RespostaPerguntaAtividade();

        entityResPerguntaAtividade.setPerguntaId(resQuestao.questaoId);
        entityResPerguntaAtividade.setResposta(resQuestao.resposta);
        return entityResPerguntaAtividade;
      }))

      return entityRespostaAtividade;
    })
  }
}