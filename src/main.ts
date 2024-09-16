import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { PrismaService } from './infra/database/PrismaService';
import { UserType } from './model/entities/UserTypeEnum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  
  const config = new DocumentBuilder()
    .setTitle('Feras API')
    .setDescription('API colégio feras')
    .setVersion('1.0')
    .addTag('feras')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const prisma = app.get(PrismaService);
  await populateUsers(prisma)
  await app.listen(3000);
}
bootstrap();

async function populateUsers(prisma: PrismaService) {
  const someUser = await prisma.user.findFirst();

  if (await prisma.user.findFirst()) {
    return;
  }

  await prisma.user.createMany({
    data: [{
      email: 'pedro@colegioferas.com.br',
      name: 'Pedro Farias',
      password: 'fd04cdad75add94e6f5cd3d2008abad325ca2b5c2c3862196ad66e7ad80e48a3',
      type: UserType.STUDENT
    }, {
      email: 'lisandra@colegioferas.com.br',
      name: 'Lisandra Albuquerque',
      password: 'f35848da105e960cfb389f62eaf959e511ce5887119643b11b724eecfd3222d5',
      type: UserType.STUDENT
    }, {
      email: 'rebeca@colegioferas.com.br',
      name: 'Rebeca Andrade',
      password: '61a8f5e2e23f3c53f8c4f01286e7d17fa95c6d53a9c535843acf7e7044a5545b',
      type: UserType.STUDENT
    }],
  })

  await prisma.user.createMany({
    data: [{
      email: 'soares@colegioferas.com.br',
      name: 'Soares',
      password: '03767b8f664f95470636d96ef37c2bfc7617622e4e7a93727b8dcbc5b79f96bf',
      type: UserType.TEACHER
    }, {
      email: 'ricardo@colegioferas.com.br',
      name: 'Ricardo',
      password: '53b3248cd3d2fab9ae0a17099030f43e49017421d2f00537fcaf9ae8c36a3c4e',
      type: UserType.TEACHER
    }, {
      email: 'veronica@colegioferas.com.br',
      name: 'Veronica',
      password: '07e41add23c67272095e965352e299739f72ac4d449732247e9e2a90310929e5',
      type: UserType.TEACHER
    }],
  })
}
