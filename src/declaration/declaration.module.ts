import { Module } from '@nestjs/common';
import { DeclarationService } from './declaration.service';
import { DeclarationController } from './declaration.controller';
import { Declaration } from './declaration.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module'; // Importe o UserModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Declaration]), // Certifique-se de que a declaração está registrada
    UserModule, // Importe o UserModule
  ],
  providers: [DeclarationService],
  controllers: [DeclarationController],
})
export class DeclarationModule { }
