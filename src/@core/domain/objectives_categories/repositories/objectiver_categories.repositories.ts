import { FindOptions, UpdateOptions } from "sequelize";
import { CreateObjectivesCategoryDto } from "../dto/create-objectives_category.dto";
import { ObjectivesCategories } from "../entities/objectives_category.entity";

export interface ObjectivesCategoriesInterface {
    findOne(query: FindOptions): Promise<ObjectivesCategories>
    findAll(query?: FindOptions): Promise<ObjectivesCategories>
    create(user: CreateObjectivesCategoryDto): Promise<ObjectivesCategories>
    update(values: any, query): Promise<ObjectivesCategories>
    destroy(query: UpdateOptions): Promise<ObjectivesCategories>
}