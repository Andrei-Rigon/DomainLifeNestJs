import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ObjectivesCategoriesService } from '../services/objectives_categories.service';
import { CreateObjectivesCategoryDto } from '../dto/create-objectives_category.dto';
import { UpdateObjectivesCategoryDto } from '../dto/update-objectives_category.dto';

@Controller('objectives-categories')
export class ObjectivesCategoriesController {
  constructor(private readonly objectivesCategoriesService: ObjectivesCategoriesService) {}

  @Post()
  create(@Body() createObjectivesCategoryDto: CreateObjectivesCategoryDto) {
    return this.objectivesCategoriesService.create(createObjectivesCategoryDto);
  }

  @Get()
  findAll() {
    return this.objectivesCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.objectivesCategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateObjectivesCategoryDto: UpdateObjectivesCategoryDto) {
    return this.objectivesCategoriesService.update(+id, updateObjectivesCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.objectivesCategoriesService.remove(+id);
  }
}
