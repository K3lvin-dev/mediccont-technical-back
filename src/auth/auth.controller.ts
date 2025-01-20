import { Controller, Post, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) { }

    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
        const user = await this.authService.validateUser(body.email, body.password);
        return this.authService.login(user);
    }

    @Post('generate-2fa/:userId')
    async generateTwoFactorSecret(@Param('userId') userId: number) {
        return this.authService.generateTwoFactorSecret(userId);
    }

    @Post('validate-2fa')
    async validateTwoFactorCode(
        @Body() body: { secret: string; code: string },
    ): Promise<{ valid: boolean }> {
        const valid = this.authService.validateTwoFactorCode(body.secret, body.code);
        return { valid };
    }

    @Post('register')
    async register(
        @Body() body: { name: string; email: string; password: string },
    ): Promise<User> {
        return this.userService.createUser(body.name, body.email, body.password);
    }
}
