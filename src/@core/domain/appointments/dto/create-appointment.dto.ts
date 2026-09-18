import { IsDateString, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class CreateAppointmentDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsDateString()
  data_evento: string;

  @IsOptional()
  @Matches(/^\d{2}:\d{2}(:\d{2})?$/, { message: 'hora_evento deve estar no formato HH:mm' })
  hora_evento?: string;

  @IsOptional()
  @IsString()
  localizacao?: string;
}
