import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Tournament } from '../../tournaments/entities/tournament.entity';
import { Player } from '../../players/entities/player.entity';
import { Min } from 'class-validator';
import { Winner } from '../enums/winner.enum';


@Entity()
export class Result {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Tournament, tournament => tournament.results)
    tournament: Tournament;

    @ManyToOne(() => Player, player => player.resultsAsPlayerA)
    playerA: Player;

    @ManyToOne(() => Player, player => player.resultsAsPlayerB)
    playerB: Player;

    @Column()
    @Min(0)
    playerAScore: number;

    @Column()
    @Min(0)
    playerBScore: number;

    @Column({ default: 0 })
    totalPoints: number;

    @Column({
        type: 'enum',
        enum: Winner,  // Enum import
        nullable: true
    })
    winner: Winner;
}