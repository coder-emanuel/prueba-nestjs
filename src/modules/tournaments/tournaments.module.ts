import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TournamentsController } from './tournaments.controller';
import { TournamentsService } from './tournaments.service';
import { Tournament } from './entities/tournament.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tournament])],
  controllers: [TournamentsController],
  providers: [TournamentsService],
  exports: [TypeOrmModule],
})
export class TournamentsModule {}
