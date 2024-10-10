import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tournaments')
@Controller('tournaments')
// @UseGuards(JwtAuthGuard) //Protect all endpoints on this controller
export class TournamentsController {
    constructor(private readonly tournamentsService: TournamentsService) { }

    @Post()
    create(@Body() createTournamentDto: CreateTournamentDto) {
        return this.tournamentsService.create(createTournamentDto);
    }

    @Get()
    findAll() {
        return this.tournamentsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.tournamentsService.findOne(id);
    }

    @Put(':id') 
    update(@Param('id') id: string, @Body() updateTournamentDto: UpdateTournamentDto) {
        return this.tournamentsService.update(id, updateTournamentDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.tournamentsService.remove(id);
    }
}


