import { Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { CreateNoteDto } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note.dto';
import type { NotesRepositoryInterface } from '../repositories/notes.repositories';


@Injectable()
export class NotesService {

  constructor(
    @Inject('NOTES_REPOSITORY')
    private readonly notesRepository: NotesRepositoryInterface,
  ) {}

  create(createNoteDto: CreateNoteDto) {
    return this.notesRepository.create(createNoteDto);
  }

  findAll(start?: string, end?: string) {
    return this.notesRepository.findAll({
      where:
        start && end
          ? {
              data_evento: {
                [Op.between]: [start, end],
              },
            }
          : undefined,
      order: [
        ['created_at', 'ASC'],
        ['created_at', 'ASC'],
      ],
    });
  }

  findOne(id: number) {
    return this.notesRepository.findOne({
      where: {
        id
      }})
  }

  update(id: number, updateNoteDto: UpdateNoteDto) {
    return this.notesRepository.update(updateNoteDto, {
      where: {
        id
      }
    })
  }

  remove(id: number) {
    return this.notesRepository.destroy({
      where: {
        id
      }
    })
  }
}
