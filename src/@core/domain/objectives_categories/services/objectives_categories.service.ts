import { Injectable, Inject } from '@nestjs/common';
import { CreateObjectivesCategoryDto } from '../dto/create-objectives_category.dto';
import { UpdateObjectivesCategoryDto } from '../dto/update-objectives_category.dto';
import type { ObjectivesCategoriesInterface } from '../repositories/objectiver_categories.repositories';

@Injectable()
export class ObjectivesCategoriesService {

  constructor(
    @Inject('OBJECTIVES_CATEGORIES_REPOSITORY')
    private readonly objectivesCategoriesRepository: ObjectivesCategoriesInterface 
  ) {}

  create(createObjectivesCategoryDto: CreateObjectivesCategoryDto) {
    return this.objectivesCategoriesRepository.create(createObjectivesCategoryDto);
  }

  findAll() {
    return this.objectivesCategoriesRepository.findAll();
  }

  findOne(id: number) {
    return this.objectivesCategoriesRepository.findOne({
      where: {
        id
      }
    })
  }

  update(id: number, updateObjectivesCategoryDto: UpdateObjectivesCategoryDto) {
    return this.objectivesCategoriesRepository.update(updateObjectivesCategoryDto, {
      where: {
        id
      }
    })
  }

  remove(id: number) {
    return this.objectivesCategoriesRepository.destroy({
      where: {
        id
      }
    })
  }
}
