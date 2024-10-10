import { IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';

export class CreateResultDto {
    @IsNotEmpty()
    @IsUUID()
    tournamentId: string;

    @IsNotEmpty()
    @IsUUID()
    playerAId: string;

    @IsNotEmpty()
    @IsUUID()
    playerBId: string;
    
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    playerAScore: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    playerBScore: number;

    // Constructor to facilitate the creation of DTO instances
    constructor(
        tournamentId: string,
        playerAId: string,
        playerBId: string,
        playerAScore: number,
        playerBScore: number
    ) {
        this.tournamentId = tournamentId;
        this.playerAId = playerAId;
        this.playerBId = playerBId;
        this.playerAScore = playerAScore;
        this.playerBScore = playerBScore;
    }
}
