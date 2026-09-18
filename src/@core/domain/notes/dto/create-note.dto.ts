import { IsDateString, IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";

export class CreateNoteDto {

    @IsString()
    @IsNotEmpty()
    titulo!: string;

    @IsString()
    @IsOptional()
    descricao?: string

    @IsString()
    @IsOptional()
    cor?: string

}




