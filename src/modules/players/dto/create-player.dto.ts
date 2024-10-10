import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePlayerDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    team: string;

    @IsNotEmpty()
    @IsNumber()
    age: number;

    @IsNotEmpty()
    @IsString()
    nationality: string;
}