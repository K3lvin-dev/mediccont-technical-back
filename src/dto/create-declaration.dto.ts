import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsOptional, IsInt } from 'class-validator';

export class CreateDeclarationDto {
    @ApiProperty({ description: 'ID do usuário', example: 1 })
    @IsInt()
    @IsNotEmpty()
    user_id: number;

    @ApiProperty({ description: 'Ano da declaração', example: 2024 })
    @IsInt()
    @IsNotEmpty()
    year: number;

    @ApiProperty({ description: 'CPF ou CNPJ do contribuinte', example: '12345678901234' })
    @IsString()
    @IsNotEmpty()
    cpf_cnpj: string;

    @ApiProperty({ description: 'Renda declarada', example: 50000 })
    @IsNumber()
    @IsNotEmpty()
    income: number;

    @ApiProperty({ description: 'Despesas dedutíveis', example: 10000, required: false })
    @IsNumber()
    @IsOptional()
    expenses?: number;

    @ApiProperty({ description: 'Renda tributável', example: 40000, required: false })
    @IsNumber()
    @IsOptional()
    taxable_income?: number;

    @ApiProperty({ description: 'Imposto pago', example: 5000, required: false })
    @IsNumber()
    @IsOptional()
    tax_paid?: number;

    @ApiProperty({ description: 'Status da declaração', example: 'não submetida', required: false })
    @IsString()
    @IsOptional()
    status?: string;

    @ApiProperty({ description: 'Observações adicionais', example: 'Observação sobre a declaração', required: false })
    @IsString()
    @IsOptional()
    notes?: string;
}
