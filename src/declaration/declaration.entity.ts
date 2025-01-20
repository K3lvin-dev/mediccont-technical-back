import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { ManyToOne } from 'typeorm';

@Entity('declarations')
export class Declaration {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.declarations, { onDelete: 'CASCADE' })
    user: User;

    @Column({ type: 'int' })
    year: number;

    @Column({ type: 'varchar', length: 14 })
    cpfCnpj: string;

    @Column({ type: 'numeric', precision: 15, scale: 2 })
    income: number;

    @Column({ type: 'numeric', precision: 15, scale: 2, nullable: true })
    expenses?: number;

    @Column({ type: 'numeric', precision: 15, scale: 2, nullable: true })
    taxableIncome?: number;

    @Column({ type: 'numeric', precision: 15, scale: 2, nullable: true })
    taxPaid?: number;

    @Column({ type: 'varchar', length: 20, default: 'não submetida' })
    status: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    submittedAt?: Date;

    @Column({ type: 'text', nullable: true })
    notes?: string;
}
