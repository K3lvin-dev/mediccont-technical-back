import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity'; // Supondo que você tenha a entidade User configurada

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>, // Injeção do repositório de usuários
    ) { }

    // Método para buscar um usuário pelo e-mail
    async findUserByEmail(email: string): Promise<User> {
        return this.userRepository.findOne({ where: { email } });
    }

    // Buscar um usuário por ID
    async findById(id: number): Promise<User> {
        return this.userRepository.findOne({
            where: { id },
        });
    }

    async enableTwoFactorAuthentication(userId: number, secret: string): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });

        if (!user) {
            throw new Error('User not found');
        }

        user.twoFactorSecret = secret; // Armazenar o segredo
        user.isTwoFactorEnabled = true; // Ativar o 2FA

        await this.userRepository.save(user);

        return user;
    }

    // Método para criar um novo usuário
    async createUser(name: string, email: string, password: string): Promise<User> {
        // Hashing da senha antes de salvar no banco de dados
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({
            name,
            email,
            password: hashedPassword,
        });
        return this.userRepository.save(user);
    }

    // Método para verificar se a senha fornecida é válida
    async validatePassword(user: User, password: string): Promise<boolean> {
        return bcrypt.compare(password, user.password); // Verifica a senha com bcrypt
    }
}
