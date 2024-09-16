import { Injectable } from "@nestjs/common";
import { RespostaAtividade } from "../entities/RespostaAtividade";
import { PrismaService } from "src/infra/database/PrismaService";

@Injectable()
export class DevolverAtividadeService {
  constructor(private readonly prisma: PrismaService) {
    
  }
  
  public async devolverAtividade(respostaAtividade: RespostaAtividade) {
    await this.prisma.respostaAtividade.create({
      data: {
        userId: respostaAtividade.getIdUsuario(),
        atividadeId: respostaAtividade.getIdAtividade(),
        RespostaQuestao: {
          createMany: {
            data: respostaAtividade.getRespostas().map(res => ({
              questaoId: res.getPerguntaId(),
              resposta: res.getResposta()
            }))
          }
        }
      },
    })
  }
}