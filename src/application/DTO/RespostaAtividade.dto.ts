import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsNotEmpty } from "class-validator";
import { RespostaPerguntaAtividadeDTO } from "./RespostaPerguntaAtividade.dto";
import { RespostaAtividade } from "src/model/entities/RespostaAtividade";

export class RespostaAtividadeDTO {
  id?: number;
  idAtividade?: number;
  idUsuario?: number;
  nota?: number;

  @IsNotEmpty({ message: 'Campo "respostas" obrigatório' })
  @ApiProperty({
    type: RespostaPerguntaAtividadeDTO,
  })
  @IsArray()
  @ArrayMinSize(1)
  respostas: RespostaPerguntaAtividadeDTO[];

  public static fromModel(respostaAtividade: RespostaAtividade) {
    const respostaAtividadeDTO = new RespostaAtividadeDTO();

    respostaAtividadeDTO.id = respostaAtividade.getId();
    respostaAtividadeDTO.idAtividade = respostaAtividade.getIdAtividade();
    respostaAtividadeDTO.idUsuario = respostaAtividade.getIdUsuario();
    respostaAtividadeDTO.nota = respostaAtividade.getNota();
    respostaAtividadeDTO.respostas = respostaAtividade.getRespostas().map(res => RespostaPerguntaAtividadeDTO.fromModel(res))

    return respostaAtividadeDTO;
  }

  public assembleModel(): RespostaAtividade {
    const respostaAtividade = new RespostaAtividade();

    respostaAtividade.setIdAtividade(this.idAtividade);
    respostaAtividade.setIdUsuario(this.idUsuario);
    respostaAtividade.setNota(this.nota || null);
    respostaAtividade.setRespostas(this.respostas.map(res => res.assembleModel()))

    return respostaAtividade;
  }
}