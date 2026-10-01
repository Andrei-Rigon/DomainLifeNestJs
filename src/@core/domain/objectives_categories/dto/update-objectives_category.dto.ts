import { PartialType } from '@nestjs/mapped-types';
import { CreateObjectivesCategoryDto } from './create-objectives_category.dto';

export class UpdateObjectivesCategoryDto extends PartialType(CreateObjectivesCategoryDto) {}
