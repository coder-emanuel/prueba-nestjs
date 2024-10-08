import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from './entities/result.entity';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';

@Injectable()
export class ResultsService {
    constructor(
        @InjectRepository(Result)
        private readonly resultRepository: Repository<Result>,
    ) {}

    async create(createResultDto: CreateResultDto): Promise<Result> {
        const result = this.resultRepository.create(createResultDto);
        return await this.resultRepository.save(result);
    }

    async findAll(): Promise<Result[]> {
        return await this.resultRepository.find();
    }

    async findOne(id: string): Promise<Result> {
        const result = await this.resultRepository.findOneBy({ id });
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
        return await this.resultRepository.save(result);
    }

    async remove(id: string): Promise<void> {
        const result = await this.findOne(id);
        await this.resultRepository.remove(result);
    }
}
