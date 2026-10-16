import { Module } from '@nestjs/common';
import { CountsService } from '../services/counts.service';
import { CountsController } from '../controllers/counts.controller';

@Module({
  controllers: [CountsController],
  providers: [CountsService],
})
export class CountsModule {}
