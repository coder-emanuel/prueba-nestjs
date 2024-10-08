import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Result {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    score1: number;

    @Column()
    score2: number;
}