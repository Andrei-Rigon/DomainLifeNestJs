import { FindOptions, UpdateOptions } from "sequelize";
import { CreateCountDto } from "../dto/create-count.dto";
import { Counts } from "../entities/count.entity";

export interface CountsRepositoryInterface {
    findOne(query: FindOptions): Promise<Counts>;
    findAll(query?: FindOptions): Promise<Counts>;
    create(user: CreateCountDto): Promise<Counts>;
    update(values: any, query: UpdateOptions): Promise<Counts>;
    destroy(query: UpdateOptions): Promise<Counts>;
}
