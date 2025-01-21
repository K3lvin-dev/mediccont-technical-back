import { Controller, Post, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from 'src/dto/create-user.dto';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) { }

    @Post('login')
    @ApiOperation({ summary: 'Realizar login do usuário' })
    @ApiResponse({ status: 200, description: 'Login realizado com sucesso.' })
    @ApiResponse({ status: 401, description: 'Credenciais inválidas.' })
    async login(@Body() body: { email: string; password: string }) {
        const user = await this.authService.validateUser(body.email, body.password);
        return this.authService.login(user);
    }

    @Post('generate-2fa/:userId')
    @ApiOperation({ summary: 'Gerar o segredo para autenticação de dois fatores' })
    @ApiResponse({ status: 200, description: 'Segredo gerado com sucesso.' })
    async generateTwoFactorSecret(@Param('userId') userId: number) {
        return this.authService.generateTwoFactorSecret(userId);
    }

    @Post('validate-2fa')
    @ApiOperation({ summary: 'Validar o código de autenticação de dois fatores' })
    @ApiResponse({ status: 200, description: 'Código de 2FA válido.' })
    @ApiResponse({ status: 400, description: 'Código de 2FA inválido.' })
    async validateTwoFactorCode(
        @Body() body: { secret: string; code: string },
    ): Promise<{ valid: boolean }> {
        const valid = this.authService.validateTwoFactorCode(body.secret, body.code);
        return { valid };
    }

    @Post('register')
    @ApiOperation({ summary: 'Registrar um novo usuário' })
    @ApiBody({ type: CreateUserDto })  // Especifique o DTO aqui
    @ApiResponse({ status: 201, description: 'Usuário registrado com sucesso.' })
    @ApiResponse({ status: 400, description: 'Erro ao registrar o usuário.' })
    async register(
        @Body() body: CreateUserDto,  // Utilize o DTO como tipo do corpo
    ): Promise<User> {
        return this.userService.createUser(body.name, body.email, body.password);
    }
}
