import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Adicionando User ao TypeOrmModule
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService], // Caso o serviço precise ser acessado em outros módulos
})
export class UserModule { }
