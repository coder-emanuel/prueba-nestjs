import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tournament } from './entities/tournament.entity';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';

@Injectable()
export class TournamentsService {
    constructor(
        @InjectRepository(Tournament)
        private readonly tournamentRepository: Repository<Tournament>,
    ) {}

    async create(createTournamentDto: CreateTournamentDto): Promise<Tournament> {
        const tournament = this.tournamentRepository.create(createTournamentDto);
        return await this.tournamentRepository.save(tournament);
    }

    async findAll(): Promise<Tournament[]> {
        return await this.tournamentRepository.find();
    }

    async findOne(id: string): Promise<Tournament> {
        const tournament = await this.tournamentRepository.findOneBy({ id });
        if (!tournament) {
            throw new NotFoundException(`Tournament with ID ${id} not found`);
        }
        return tournament;
    }

    async update(id: string, updateTournamentDto: UpdateTournamentDto): Promise<Tournament> {
       const tournament = await this.tournamentRepository.preload({
        id,
        ...updateTournamentDto,
       });
       if (!tournament) {
        throw new NotFoundException(`Tournament with ID ${id} not found`);
       }
       return await this.tournamentRepository.save(tournament);
    }

    async remove(id: string): Promise<void> {
        const tournament = await this.findOne(id);
        await this.tournamentRepository.remove(tournament);
    }
}
