import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Questao } from "src/model/entities/Questao";

export class QuestaoDTO {
  id?: number;

  @IsNotEmpty({ message: 'Pergunta obrigatória' })
  @ApiProperty({
    type: 'string',
  })
  pergunta: string;

  public static fromModel(questao: Questao) {
    const questaoDTO = new QuestaoDTO();

    questaoDTO.id = questao.getId();
    questaoDTO.pergunta = questao.getPergunta();

    return questaoDTO;
  }

  public assembleModel(): Questao {
    const questao = new Questao();

    questao.setPergunta(this.pergunta);

    return questao;
  }
}