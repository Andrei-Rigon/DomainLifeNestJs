import { Module } from '@nestjs/common';
import { ObjectivesCategoriesService } from '../services/objectives_categories.service';
import { ObjectivesCategoriesController } from '../controllers/objectives_categories.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ObjectivesCategories } from '../entities/objectives_category.entity'
import { ObjectivesCategoriesProvider } from '../providers/objectives_categories.providers';

@Module({
  imports: [SequelizeModule.forFeature([ObjectivesCategories])],
  controllers: [ObjectivesCategoriesController],
  providers: [
    ObjectivesCategoriesService, 
      ...ObjectivesCategoriesProvider],
})
export class ObjectivesCategoriesModule {}
