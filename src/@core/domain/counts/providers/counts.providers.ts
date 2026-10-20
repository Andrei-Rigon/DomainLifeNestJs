import { Counts } from "../entities/count.entity";

export const CountsProvider = [
    {
        provide: 'COUNT_REPOSITORY',
        useValue: Counts
    }
]