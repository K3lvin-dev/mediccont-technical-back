import { Module } from '@nestjs/common';
import { DeclarationService } from './declaration.service';
import { DeclarationController } from './declaration.controller';

@Module({
  providers: [DeclarationService],
  controllers: [DeclarationController]
})
export class DeclarationModule {}
