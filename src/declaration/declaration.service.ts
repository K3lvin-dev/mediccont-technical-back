import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Declaration } from './declaration.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class DeclarationService {
    constructor(
        @InjectRepository(Declaration)
        private declarationRepository: Repository<Declaration>,
        private userService: UserService,
    ) { }

    // Criar uma nova declaração
    async create(declarationData: Partial<Declaration>): Promise<Declaration> {
        console.log("declarationData: ", declarationData);

        const user = await this.userService.findById(declarationData.user);
        if (!user) {
            throw new Error('User not found');
        }

        const declaration = this.declarationRepository.create({
            ...declarationData,
            user: user.id,
        });

        console.log("declaration1: ", declaration);
        return this.declarationRepository.save(declaration);
    }

    // Listar todas as declarações com o usuário associado
    async findAll(): Promise<Declaration[]> {
        return this.declarationRepository.find({
            relations: ['user'],
        });
    }

    // Buscar uma declaração por ID
    async findOne(id: number): Promise<Declaration> {
        const declaration = await this.declarationRepository.findOne({
            where: { id },
            relations: ['user'],
        });

        if (!declaration) {
            throw new Error('Declaration not found');
        }

        return declaration;
    }

    // Atualizar uma declaração
    async update(id: number, updateData: Partial<Declaration>): Promise<Declaration> {
        const declaration = await this.findOne(id); // Garantir que a declaração exista

        // Atualizando dados
        Object.assign(declaration, updateData);

        return this.declarationRepository.save(declaration); // Salvar e retornar a declaração atualizada
    }

    // Excluir uma declaração
    async remove(id: number): Promise<void> {
        const declaration = await this.findOne(id);
        await this.declarationRepository.remove(declaration);
    }
}
