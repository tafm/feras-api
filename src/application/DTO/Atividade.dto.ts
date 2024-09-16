import { ApiProperty } from "@nestjs/swagger";
import { QuestaoDTO } from "./Questao.dto";
import { Atividade } from "src/model/entities/Atividade";
import { ArrayMinSize, IsArray, IsNotEmpty } from "class-validator";
import { Type, plainToInstance } from "class-transformer";

export class AtividadeDTO {
  id?: number;

  @IsNotEmpty({ message: 'Título' })
  @ApiProperty({
    type: 'string',
  })
  titulo: string;

  @IsNotEmpty({ message: 'Obrigatório fornecer questões da atividade' })
  @IsArray()
  @ArrayMinSize(1)
  @ApiProperty({
    type: QuestaoDTO,
  })
  questoes: QuestaoDTO[];

  public static fromModel(atividade: Atividade) {
    const atividadeDTO = new AtividadeDTO()

    atividadeDTO.titulo = atividade.getTitulo();
    atividadeDTO.id = atividade.getId()
    atividadeDTO.questoes = atividade.getQuestoes().map(questao => QuestaoDTO.fromModel(questao))

    return atividadeDTO;
  }

  public assembleModel(): Atividade {
    const atividade = new Atividade();

    atividade.setTitulo(this.titulo);
    atividade.setQuestoes(this.questoes.map(q => plainToInstance(QuestaoDTO, q).assembleModel()));

    return atividade;
  }
}