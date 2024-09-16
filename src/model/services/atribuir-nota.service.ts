import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/database/PrismaService";

@Injectable()
export class AtribuirNotaService {
  constructor(private readonly prisma: PrismaService) {
    
  }
  
  public async atribuirNota(idRespostaAtividade: number, nota: number) {
    await this.prisma.respostaAtividade.updateMany({
      where: {
        id: {
          equals: idRespostaAtividade
        }
      },
      data: {
        nota: nota
      }
    })
  }
}