import { Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { CreateObjectiveDto } from '../dto/create-objective.dto'
import { UpdateObjectiveDto } from '../dto/update-objective.dto'
import type { ObjectivesInterface } from '../repositories/objectives.repositories';

@Injectable()
export class ObjectivesService {

    constructor(
        @Inject('OBJECTIVES_REPOSITORY')
        private readonly objectivesRepository: ObjectivesInterface
    ){}

    create(CreateObjectiveDto: CreateObjectiveDto) {
        return this.objectivesRepository.create(CreateObjectiveDto);
    }

    findAll() {
        return this.objectivesRepository.findAll();
    }

    findOne(id: number) {
        return this.objectivesRepository.findOne({
            where: {
                id
            }
        })
    }

    update(id: number, UpdateObjectiveDto: UpdateObjectiveDto) {
        return this.objectivesRepository.update(UpdateObjectiveDto,({
            where: {
                id
            }
        }))
    }

    remove(id: number) {
        return this.objectivesRepository.destroy({
            where: {
                id
            }
        })
    }

}