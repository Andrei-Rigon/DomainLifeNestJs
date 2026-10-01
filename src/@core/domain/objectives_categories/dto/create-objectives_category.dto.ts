import { IsBooleanString, IsDateString, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Matches, MaxLength } from 'class-validator';

export class CreateObjectivesCategoryDto {
    
        @IsString()
        @IsNotEmpty()
        @MaxLength(255, {
            message: 'O título deve ter no máximo 255 caracteres.'
        })
        titulo!: string
}
