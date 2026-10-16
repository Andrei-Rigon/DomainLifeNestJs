import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ObjectivesService } from '../services/objectives.service';
import { ObjectivesController } from '../controllers/objectives.controller';
import { Objectives } from '../entities/objectives.entities';
import { ObjectivesProvider } from '../providers/objectives.provider';

@Module({
  imports: [SequelizeModule.forFeature([Objectives])],
  controllers: [ObjectivesController],
  providers: [
    ObjectivesService,
    ...ObjectivesProvider
  ],
})
export class ObjectivesModule {}