import { Objectives } from "../entities/objectives.entities";

export const ObjectivesProvider = [
    {
        provide: 'OBJECTIVES_REPOSITORY',
        useValue: Objectives
    }
]