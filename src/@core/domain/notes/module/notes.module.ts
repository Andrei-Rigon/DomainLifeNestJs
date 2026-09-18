import { Module } from '@nestjs/common';
import { NotesService } from '../services/notes.service';
import { NotesController } from '../controllers/notes.controller';
// Aqui importa o provider quando estiver pronto
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([])],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
