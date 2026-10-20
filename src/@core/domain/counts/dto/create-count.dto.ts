import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export enum TipoConta {
  RECORRENTE = 'Recorrente',
  CONTA = 'Conta',
  ASSINATURA = 'Assinatura',
}

export class CreateCountDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MaxLength(255)
  nome?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  descricao?: string | null;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'valor_esperado deve ter no máximo 2 casas decimais' })
  @Min(0)
  valor_esperado?: number | null;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'valor_pago deve ter no máximo 2 casas decimais' })
  @Min(0)
  valor_pago?: number | null;

  @IsEnum(TipoConta, { message: 'tipo deve ser Recorrente, Conta ou Assinatura' })
  tipo?: TipoConta;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  qtde_parceladas?: number | null;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  id_categoria_conta?: number | null;
}


