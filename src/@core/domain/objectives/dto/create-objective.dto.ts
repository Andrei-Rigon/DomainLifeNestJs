import { IsBooleanString, IsDateString, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Matches } from 'class-validator';

export class CreateObjectiveDto {
  @IsString()
  @IsNotEmpty()
  titulo!: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsDateString()
  @IsOptional()
  prazo!: string;

  @IsOptional()
  @IsNumberString()
  valor_guardado!: string

  @IsOptional()
  @IsNumberString()
  valor_objetivo!: string

  @IsOptional()
  @IsNumberString()
  porcentagem!: string

  @IsOptional()
  @IsBooleanString()
  checked!: string

  @IsString()
  prioridade!: string

  @IsNumberString()
  id_categoria!: string
}