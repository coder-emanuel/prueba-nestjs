import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultService } from './results.service';
import { ResultsController } from './results.controller';
import { Result } from './entities/result.entity';
import { Tournament } from '../tournaments/entities/tournament.entity'; 
import { Player } from '../players/entities/player.entity'; 
import { TournamentsModule } from '../tournaments/tournaments.module'; 
import { PlayersModule } from '../players/players.module'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Result, Tournament, Player]), 
    TournamentsModule, 
    PlayersModule, 
  ],
  providers: [ResultService],
  controllers: [ResultsController], 
  exports: [ResultService],
})
export class ResultsModule {}


