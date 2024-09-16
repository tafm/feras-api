import { Controller, Post, UseGuards, Request, UnauthorizedException, Body, Get, Param } from "@nestjs/common";
import { AuthGuard } from "../auth/guard";
import { UserType } from "src/model/entities/UserTypeEnum";
import { AtividadeDTO } from "../DTO/Atividade.dto";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { CreateAtividadeService } from "src/model/services/create-atividade.service";
import { ListAtividadesService } from "src/model/services/list-atividades.service";
import { RespostaAtividadeDTO } from "../DTO/RespostaAtividade.dto";
import { RespostaPerguntaAtividadeDTO } from "../DTO/RespostaPerguntaAtividade.dto";
import { DevolverAtividadeService } from "src/model/services/devolver-atividade.service";
import { ListAtividadesDevolvidasService } from "src/model/services/list-atividades-devolvidas.service";
import { ApiOkResponse } from "@nestjs/swagger";
import { AtribuirNotaDTO } from "../DTO/AtribuirNota.dto";
import { AtribuirNotaService } from "src/model/services/atribuir-nota.service";

@Controller('atividades')
export class AtividadeController {
  constructor(
    private readonly createAtividadeService: CreateAtividadeService,
    private readonly listAtividadesService: ListAtividadesService,
    private readonly devolverAtividadeService: DevolverAtividadeService,
    private readonly listAtividadesDevolvidasService: ListAtividadesDevolvidasService,
    private readonly atribuirNotaService: AtribuirNotaService
  ) { }

  @Post('')
  @UseGuards(AuthGuard)
  public async createAtividade(@Request() req, @Body() atividade: AtividadeDTO) {
    if (req.user.type !== UserType.TEACHER) {
      throw new UnauthorizedException()
    }

    atividade = plainToInstance(AtividadeDTO, atividade)

    return this.createAtividadeService.createAtivivade(atividade.assembleModel())
  }
  
  @ApiOkResponse({
    description: 'Lista de atividades disponíveis',
    type: AtividadeDTO,
    isArray: true
  })
  @Get('')
  @UseGuards(AuthGuard)
  public async getAllAtividades() {
    return instanceToPlain((await this.listAtividadesService.getAtividades()).map(atividade => AtividadeDTO.fromModel(atividade)));
  }

  @Post('/:atividadeId/devolver')
  @UseGuards(AuthGuard)
  public async responderAtividade(@Request() req, @Param('atividadeId') atividadeId, @Body() respostaAtividadeDTO: RespostaAtividadeDTO) {
    if (req.user.type !== UserType.STUDENT) {
      throw new UnauthorizedException()
    }
    
    respostaAtividadeDTO.idAtividade = parseInt(atividadeId);
    respostaAtividadeDTO.idUsuario = req.user.sub;
    respostaAtividadeDTO = plainToInstance(RespostaAtividadeDTO, respostaAtividadeDTO)
    respostaAtividadeDTO.respostas = respostaAtividadeDTO.respostas.map(res => plainToInstance(RespostaPerguntaAtividadeDTO, res))

    await this.devolverAtividadeService.devolverAtividade(respostaAtividadeDTO.assembleModel());
  }

  @ApiOkResponse({
    description: 'Lista de atividades devolvidas',
    type: AtividadeDTO,
    isArray: true
  })
  @Get('/devolvidas')
  @UseGuards(AuthGuard)
  public async getAtividadesDevolvidas(@Request() req) {
    let studentId = null;

    if (req.user.type === UserType.STUDENT) {
      studentId = req.user.sub;
    }

    const atividades = await this.listAtividadesDevolvidasService.listAtividadesDevolvidas(studentId);

    return atividades.map(atividade => RespostaAtividadeDTO.fromModel(atividade))
  }

  @Post('devolvidas/:idRespostaAtividade/atribuirnota')
  @UseGuards(AuthGuard)
  public async atribuirNotaRespostaAtividade(@Param('idRespostaAtividade') atividadeId, @Request() req, @Body() atribuirNotaDTO: AtribuirNotaDTO) {
    if (req.user.type !== UserType.TEACHER) {
      throw new UnauthorizedException()
    }
    
    await this.atribuirNotaService.atribuirNota(parseInt(atividadeId), atribuirNotaDTO.nota)
  }
}