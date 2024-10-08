import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePlayerDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    team: string;
}