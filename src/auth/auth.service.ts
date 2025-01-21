import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import * as speakeasy from 'speakeasy';
import * as qrcode from 'qrcode';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findUserByEmail(email);
        if (user && (await bcrypt.compare(password, user.password))) {
            return user;
        }
        throw new UnauthorizedException('Invalid credentials');
    }

    async login(user: any): Promise<{ accessToken: string }> {
        const payload = { email: user.email, sub: user.id };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }

    async generateTwoFactorSecret(userId: number) {
        const secret = speakeasy.generateSecret();

        // Gerar o QR Code
        try {
            const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url);

            // Salvar o segredo do 2FA no banco de dados
            await this.userService.enableTwoFactorAuthentication(userId, secret.base32);

            return {
                secret: secret.base32,
                otpauthUrl: secret.otpauth_url,
                qrCodeUrl: qrCodeUrl, // URL do QR Code gerado
            };
        } catch (error) {
            throw new Error('Error generating QR Code');
        }
    }

    // Validação do código 2FA
    validateTwoFactorCode(secret: string, code: string): boolean {
        const verified = speakeasy.totp.verify({
            secret: secret,
            encoding: 'base32',
            token: code,
        });

        if (!verified) {
            throw new Error('Invalid 2FA code');
        }
        return verified;
    }
}
