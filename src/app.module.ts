import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentsModule } from './@core/domain/appointments/module/appointments.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NotesModule } from 'src/@core/domain/notes/module/notes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true// Deixar global
    }),

    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),

        autoLoadModels: true,
        synchronize: true, // Não pode subir pra prod
      }),
    }),
    AppointmentsModule,
    NotesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
