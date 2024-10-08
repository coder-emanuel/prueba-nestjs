import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tournament {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    format: string;

    @Column()
    createdAt: string;
}