import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserCredentials } from "../entities/vo/UserCredentials";
import { PrismaService } from "src/infra/database/PrismaService";
import { JwtService } from "@nestjs/jwt";
import { createHash } from "crypto";

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) {}

  public async auth(credentials: UserCredentials) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: {
          equals: credentials.getEmail()
        }
      }
    })

    if (user && user.password === createHash('sha256').update(credentials.getSenha()).digest('hex')) {
      const payload = { sub: user.id, username: user.name, type: user.type };
      return {
        name: user.name,
        type: user.type,
        access_token: await this.jwtService.signAsync(payload),
      };
    }

    throw new UnauthorizedException();
  }
}