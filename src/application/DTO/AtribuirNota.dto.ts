import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AtribuirNotaDTO {
  @IsNotEmpty({ message: 'Obrigatório fornecer uma nota' })
  @ApiProperty({
    type: 'number',
  })
  nota: number;
}