import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Counts,CategoriaConta } from '../entities/count.entity'

import { CountsService } from '../services/counts.service';
import { CountsController } from '../controllers/counts.controller';
import { CountsProvider } from '../providers/counts.providers';

@Module({
  imports: [SequelizeModule.forFeature([Counts,CategoriaConta])],
  controllers: [CountsController],
  providers: [
    CountsService,
    ...CountsProvider
  ],
})
export class CountsModule {}
