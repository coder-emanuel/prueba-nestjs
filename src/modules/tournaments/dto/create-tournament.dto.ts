import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateTournamentDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    format: string;
}