import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { RespostaPerguntaAtividade } from "src/model/entities/RespostaPerguntaAtividade";

export class RespostaPerguntaAtividadeDTO {

  @IsNotEmpty({ message: 'Identificador da pergunta obrigatório' })
  @ApiProperty({
    type: 'number',
  })
  perguntaId: number;

  @IsNotEmpty({ message: 'Resposta obrigatória' })
  @ApiProperty({
    type: 'string',
  })
  resposta: string;

  public static fromModel(respostaQuestaoAtividade: RespostaPerguntaAtividade) {
    const respostaQuestaoAtividadeDTO = new RespostaPerguntaAtividadeDTO();

    respostaQuestaoAtividadeDTO.perguntaId = respostaQuestaoAtividade.getPerguntaId();
    respostaQuestaoAtividadeDTO.resposta = respostaQuestaoAtividade.getResposta();

    return respostaQuestaoAtividadeDTO;
  }

  public assembleModel(): RespostaPerguntaAtividade {
    const respostaPerguntaAtividade = new RespostaPerguntaAtividade();

    respostaPerguntaAtividade.setPerguntaId(this.perguntaId);
    respostaPerguntaAtividade.setResposta(this.resposta);

    return respostaPerguntaAtividade;
  }
}