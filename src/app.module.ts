import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentsModule } from './@core/domain/appointments/module/appointments.module';

@Module({
  imports: [AppointmentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
