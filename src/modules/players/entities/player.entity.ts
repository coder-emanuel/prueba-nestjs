import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Result } from '../../results/entities/result.entity';

@Entity()
export class Player {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    team: string;

    @Column()
    age: number;

    @Column()
    nationality: string;

    @OneToMany(() => Result, result => result.playerA)
    resultsAsPlayerA: Result[];
  
    @OneToMany(() => Result, result => result.playerB)
    resultsAsPlayerB: Result[];
}