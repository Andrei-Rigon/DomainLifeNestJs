import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { ObjectivesService } from "../services/objectives.service";
import { CreateObjectiveDto } from "../dto/create-objective.dto";
import { UpdateObjectiveDto } from "../dto/update-objective.dto";

@Controller('objectives')
export class ObjectivesController {
    constructor(private readonly objectivesService: ObjectivesService) {

    }

    @Post()
    create(@Body() CreateObjectiveDto: CreateObjectiveDto){
        return this.objectivesService.create(CreateObjectiveDto);
    }

    @Get()
    findAll() {
        return this.objectivesService.findAll()
    }

    @Get(':id')
    FindOne(@Param('id') id:string) {
        return this.objectivesService.findOne(+id)
    }

    @Patch(':id')
    update(@Param('id') id:string, @Body() UpdateObjectiveDto: UpdateObjectiveDto){
        return this.objectivesService.update(+id, UpdateObjectiveDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.objectivesService.remove(+id)
    }
}