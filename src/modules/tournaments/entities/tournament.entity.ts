import { Column, Entity, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from 'typeorm';
import { Result } from '../../results/entities/result.entity';

@Entity()
export class Tournament {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    format: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Result, result => result.tournament)
    results: Result[];
}