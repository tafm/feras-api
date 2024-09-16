import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './infra/database/PrismaService';
import { AuthController } from './application/controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './model/services/auth.service';
import { AtividadeController } from './application/controllers/atividade.controller';
import { CreateAtividadeService } from './model/services/create-atividade.service';
import { ListAtividadesService } from './model/services/list-atividades.service';
import { DevolverAtividadeService } from './model/services/devolver-atividade.service';
import { ListAtividadesDevolvidasService } from './model/services/list-atividades-devolvidas.service';
import { AtribuirNotaService } from './model/services/atribuir-nota.service';

@Module({
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRET
  })],
  controllers: [AppController, AuthController, AtividadeController],
  providers: [
    AppService,
    PrismaService,
    AuthService,
    CreateAtividadeService,
    ListAtividadesService,
    DevolverAtividadeService,
    ListAtividadesDevolvidasService,
    AtribuirNotaService
  ],
})
export class AppModule {}
