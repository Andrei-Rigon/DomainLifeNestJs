import { Module } from '@nestjs/common';
import { NotesService } from '../services/notes.service';
import { NotesController } from '../controllers/notes.controller';
import { NotesProvider } from '../providers/notes.providers';
import { SequelizeModule } from '@nestjs/sequelize';
import { Notes } from '../entities/notes.entity'

@Module({
  imports: [SequelizeModule.forFeature([Notes])],
  controllers: [NotesController],
  providers: [
    NotesService,
    ...NotesProvider
  ],
})
export class NotesModule {}
