import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateResultDto {
    @IsNotEmpty()
    @IsNumber()
    score1: number;

    @IsNotEmpty()
    @IsNumber()
    score2: number;
}
