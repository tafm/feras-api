import { PrismaService } from "src/infra/database/PrismaService";
import { Atividade } from "../entities/Atividade";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CreateAtividadeService {
  constructor(private readonly prisma: PrismaService) {
    
  }

  public async createAtivivade(atividade: Atividade) {
    await this.prisma.atividade.create({
      data: {
        titulo: atividade.getTitulo(),
        Questao: {
          createMany: {
            data: atividade.getQuestoes().map(q => { return {
              pergunta: q.getPergunta()
            }})
          }
        }
      }
    })
  }
}