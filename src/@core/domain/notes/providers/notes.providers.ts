import { Notes } from "../entities/notes.entity";

export const NotesProvider = [
    {
        provide: 'NOTES_REPOSITORY',
        useValue: Notes
    }
]