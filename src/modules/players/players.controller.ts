import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';

@Controller('players')
// @UseGuards(JwtAuthGuard) //Protect all endpoints on this controller
export class PlayersController {
    constructor(private readonly playersService: PlayersService) { }

    @Post()
    create(@Body() createPlayerDto: CreatePlayerDto) {
        return this.playersService.create(createPlayerDto);
    }

    @Get()
    findAll() {
        return this.playersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.playersService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
        return this.playersService.update(id, updatePlayerDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.playersService.remove(id);
    }
}

