import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('declarations')
export class Declaration {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.declarations)
    @JoinColumn({ name: 'user_id' })
    user: number;

    @Column()
    year: number;

    @Column()
    cpf_cnpj: string;

    @Column('numeric', { precision: 15, scale: 2 })
    income: number;

    @Column('numeric', { precision: 15, scale: 2, nullable: true })
    expenses: number;

    @Column('numeric', { precision: 15, scale: 2, nullable: true })
    taxable_income: number;

    @Column('numeric', { precision: 15, scale: 2, nullable: true })
    tax_paid: number;

    @Column({ default: 'não submetida' })
    status: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @Column({ type: 'timestamp', nullable: true })
    submitted_at: Date;

    @Column({ type: 'text', nullable: true })
    notes: string;
}
