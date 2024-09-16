import { Body, Controller, Post } from "@nestjs/common";
import { UserCredentialsDTO } from "../DTO/UserCredentials.dto";
import { AuthService } from "src/model/services/auth.service";
import { plainToClass } from "class-transformer";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body() credentials: UserCredentialsDTO) {    
    return this.authService.auth(plainToClass(UserCredentialsDTO, credentials).assembleModel())
  }
}