import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TournamentsModule } from './modules/tournaments/tournaments.module';
import { ResultsModule } from './modules/results/results.module';
import { PlayersModule } from './modules/players/players.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make ConfigModule available throughout the application
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true, // Not recommended in production, but useful in development
    }),
    AuthModule,
    TournamentsModule,
    ResultsModule,
    PlayersModule
  ],

})
export class AppModule {}
