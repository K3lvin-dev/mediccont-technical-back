import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @Length(3, 100)
    name: string;

    @IsEmail()
    @IsNotEmpty()
    @Length(5, 100)
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(6, 255)
    password: string;
}
