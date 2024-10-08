import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './entities/player.entity';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Injectable()
export class PlayersService {
    constructor(
        @InjectRepository(Player)
        private readonly playerRepository: Repository<Player>,
    ) {}

    async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
        const player = this.playerRepository.create(createPlayerDto);
        return await this.playerRepository.save(player);
    }

    async findAll(): Promise<Player[]> {
        return await this.playerRepository.find();
    }

    async findOne(id: string): Promise<Player> {
        const player = await this.playerRepository.findOneBy({ id });
        if (!player) {
            throw new NotFoundException(`Player with ID ${id} not found`);
        }
        return player;
    }

    async update(id: string, updatePlayerDto: UpdatePlayerDto): Promise<Player> {
        const player = await this.playerRepository.preload({
            id,
            ...updatePlayerDto,
        });
        if (!player) {
            throw new NotFoundException(`Player with ID ${id} not found`);
        }
        return await this.playerRepository.save(player);
    }

    async remove(id: string): Promise<void> {
        const player = await this.findOne(id);
        await this.playerRepository.remove(player);
    }
}
