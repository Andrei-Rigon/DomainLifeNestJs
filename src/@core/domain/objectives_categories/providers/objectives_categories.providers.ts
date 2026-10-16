import { ObjectivesCategories } from "../entities/objectives_category.entity";

export const ObjectivesCategoriesProvider = [
    {
        provide: 'OBJECTIVES_CATEGORIES_REPOSITORY',
        useValue: ObjectivesCategories
    }
]