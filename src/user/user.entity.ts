import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Declaration } from 'src/declaration/declaration.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ nullable: true }) // Segredo do 2FA (se habilitado)
    twoFactorSecret: string;

    @Column({ default: false }) // Flag indicando se o 2FA está ativo
    isTwoFactorEnabled: boolean;

    @Column({ length: 100, unique: true })
    email: string;

    @Column({ length: 255 })
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Declaration, (declaration) => declaration.user)
    declarations: Declaration[];
}
