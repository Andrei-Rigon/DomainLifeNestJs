import { FindOptions, UpdateOptions } from "sequelize";
import { CreateObjectiveDto } from "../dto/create-objective.dto";
import { Objectives } from "../entities/objectives.entities";

export interface ObjectivesInterface {
    findOne(query: FindOptions): Promise<Objectives>
    findAll(query?: FindOptions): Promise<Objectives>
    create(user: CreateObjectiveDto): Promise<Objectives>
    update(values: any, query): Promise<Objectives>
    destroy(query: UpdateOptions): Promise<Objectives>
}