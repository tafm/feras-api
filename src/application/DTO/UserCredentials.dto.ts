import { ApiProperty } from "@nestjs/swagger";
import { UserCredentials } from "src/model/entities/vo/UserCredentials";

export class UserCredentialsDTO {
  @ApiProperty({
    type: 'string',
  })
  email: string;

  @ApiProperty({
    type: 'string',
  })
  password: string;

  public assembleModel(): UserCredentials {
    const credentials = new UserCredentials();

    credentials.setEmail(this.email);
    credentials.setSenha(this.password);

    return credentials;
  }
}