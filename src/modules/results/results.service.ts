import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from './entities/result.entity';
import { Tournament } from '../tournaments/entities/tournament.entity';
import { Player } from '../players/entities/player.entity';
import { Winner } from '../results/enums/winner.enum';
import { CreateResultDto } from './dto/create-result.dto'; 
import { UpdateResultDto } from './dto/update-result.dto';

@Injectable()
export class ResultService {
    constructor(
        @InjectRepository(Result)
        private readonly resultRepository: Repository<Result>,
        @InjectRepository(Tournament)
        private readonly tournamentRepository: Repository<Tournament>,
        @InjectRepository(Player)
        private readonly playerRepository: Repository<Player>,
    ) {}

    async create(createResultDto: CreateResultDto): Promise<Result> {
        const { tournamentId, playerAId, playerBId, playerAScore, playerBScore } = createResultDto;

        
        const tournament = await this.tournamentRepository.findOneBy({ id: tournamentId });
        if (!tournament) {
            throw new NotFoundException(`Tournament with ID ${tournamentId} not found`);
        }

        
        const playerA = await this.playerRepository.findOneBy({ id: playerAId });
        if (!playerA) {
            throw new NotFoundException(`Player A with ID ${playerAId} not found`);
        }

        
        const playerB = await this.playerRepository.findOneBy({ id: playerBId });
        if (!playerB) {
            throw new NotFoundException(`Player B with ID ${playerBId} not found`);
        }

       
        const result = new Result();
        result.tournament = tournament;
        result.playerA = playerA;
        result.playerB = playerB;
        result.playerAScore = playerAScore;
        result.playerBScore = playerBScore;

      
        result.totalPoints = this.calculateTotalPoints(playerAScore, playerBScore);
        result.winner = this.calculateWinner(playerAScore, playerBScore);

        return await this.resultRepository.save(result);
    }

    
    private calculateTotalPoints(playerAScore: number, playerBScore: number): number {
        return playerAScore + playerBScore;
    }

    
    private calculateWinner(playerAScore: number, playerBScore: number): Winner {
        if (playerAScore > playerBScore) {
            return Winner.PlayerA;
        } else if (playerAScore < playerBScore) {
            return Winner.PlayerB;
        } else {
            return Winner.Draw; 
        }
    }

    async findAll(): Promise<Result[]> {
        return await this.resultRepository.find({ 
            relations: ['tournament', 'playerA', 'playerB'] 
        });
    }

    async findOne(id: string): Promise<Result> {
        const result = await this.resultRepository.findOne({
            where: { id },
            relations: ['tournament', 'playerA', 'playerB'],
        });
        if (!result) {
            throw new NotFoundException(`Result with ID ${id} not found`);
        }
        return result;
    }

    async update(id: string, updateResultDto: UpdateResultDto): Promise<Result> {
        const result = await this.resultRepository.preload({
            id,
            ...updateResultDto,
        });

        if (!result) {
            throw new NotFoundException(`Result with ID ${id} not found`);
        }

       
        if (updateResultDto.playerAScore !== undefined || updateResultDto.playerBScore !== undefined) {
            result.totalPoints = this.calculateTotalPoints(
                updateResultDto.playerAScore ?? result.playerAScore, 
                updateResultDto.playerBScore ?? result.playerBScore
            );
            result.winner = this.calculateWinner(
                updateResultDto.playerAScore ?? result.playerAScore,
                updateResultDto.playerBScore ?? result.playerBScore
            );
        }

        return await this.resultRepository.save(result);
    }

    async remove(id: string): Promise<void> {
        const result = await this.findOne(id);
        await this.resultRepository.remove(result);
    }
}
