import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StockModule } from './@core/domain/stock/stock.module';
import { AppointmentsModule } from './@core/domain/appointments/appointments.module';

@Module({
  imports: [StockModule, AppointmentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
