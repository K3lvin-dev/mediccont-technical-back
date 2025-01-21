import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { DeclarationService } from './declaration.service';
import { Declaration } from './declaration.entity';

@Controller('api/declarations')
export class DeclarationController {
    constructor(private readonly declarationService: DeclarationService) { }

    // Criar uma declaração
    @Post()
    async create(@Body() declarationData: Partial<Declaration>): Promise<Declaration> {
        return this.declarationService.create(declarationData);
    }

    // Listar todas as declarações
    @Get()
    async findAll(): Promise<Declaration[]> {
        return this.declarationService.findAll();
    }

    // Buscar uma declaração por ID
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Declaration> {
        return this.declarationService.findOne(id);
    }

    // Atualizar uma declaração
    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() updateData: Partial<Declaration>,
    ): Promise<Declaration> {
        return this.declarationService.update(id, updateData);
    }

    // Excluir uma declaração
    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        return this.declarationService.remove(id);
    }
}
