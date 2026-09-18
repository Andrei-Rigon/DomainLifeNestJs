import { FindOptions, UpdateOptions } from "sequelize";
import { CreateNoteDto } from "../dto/create-note.dto";
import { Notes } from "../entities/notes.entity";

export interface NotesRepositoryInterface {
    findOne(query: FindOptions): Promise<Notes>;
    findAll(query?: FindOptions): Promise<Notes>;
    create(user: CreateNoteDto): Promise<Notes>;
    update(values: any, query: UpdateOptions): Promise<Notes>;
    destroy(query: UpdateOptions): Promise<Notes>;
}
