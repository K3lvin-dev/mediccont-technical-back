import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { DeclarationService } from './declaration.service';
import { Declaration } from './declaration.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateDeclarationDto } from 'src/dto/create-declaration.dto'; // Importar o DTO

@ApiTags('declarations')  // Categoria para o Swagger
@Controller('api/declarations')
export class DeclarationController {
    constructor(private readonly declarationService: DeclarationService) { }

    // Criar uma declaração
    @Post()
    @ApiOperation({ summary: 'Criar uma nova declaração' })
    @ApiBody({ type: CreateDeclarationDto })  // Indica que o corpo da requisição será um CreateDeclarationDto
    @ApiResponse({ status: 201, description: 'Declaração criada com sucesso.' })
    @ApiResponse({ status: 400, description: 'Erro ao criar declaração.' })
    async create(@Body() declarationData: CreateDeclarationDto): Promise<Declaration> {
        return this.declarationService.create(declarationData);
    }

    // Listar todas as declarações
    @Get()
    @ApiOperation({ summary: 'Listar todas as declarações' })
    @ApiResponse({ status: 200, description: 'Declarações encontradas.' })
    async findAll(): Promise<Declaration[]> {
        return this.declarationService.findAll();
    }

    // Buscar uma declaração por ID
    @Get(':id')
    @ApiOperation({ summary: 'Buscar uma declaração por ID' })
    @ApiResponse({ status: 200, description: 'Declaração encontrada.' })
    @ApiResponse({ status: 404, description: 'Declaração não encontrada.' })
    async findOne(@Param('id') id: number): Promise<Declaration> {
        return this.declarationService.findOne(id);
    }

    // Atualizar uma declaração
    @Put(':id')
    @ApiOperation({ summary: 'Atualizar uma declaração existente' })
    @ApiResponse({ status: 200, description: 'Declaração atualizada com sucesso.' })
    @ApiResponse({ status: 400, description: 'Erro ao atualizar a declaração.' })
    async update(
        @Param('id') id: number,
        @Body() updateData: Partial<Declaration>,
    ): Promise<Declaration> {
        return this.declarationService.update(id, updateData);
    }

    // Excluir uma declaração
    @Delete(':id')
    @ApiOperation({ summary: 'Excluir uma declaração' })
    @ApiResponse({ status: 200, description: 'Declaração excluída com sucesso.' })
    @ApiResponse({ status: 404, description: 'Declaração não encontrada.' })
    async remove(@Param('id') id: number): Promise<void> {
        return this.declarationService.remove(id);
    }
}
