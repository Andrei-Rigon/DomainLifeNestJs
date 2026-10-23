import { Inject, Injectable } from '@nestjs/common';
import { CreateCountDto } from '../dto/create-count.dto';
import { UpdateCountDto } from '../dto/update-count.dto';
import type { CountsRepositoryInterface } from '../repositories/counts.repository.interface';

@Injectable()
export class CountsService {

  constructor(
    @Inject('COUNT_REPOSITORY')
    private readonly countRepository: CountsRepositoryInterface,
  ){}

  create(createCountDto: CreateCountDto) {
    return createCountDto;
  }

  findAll() {
    return this.countRepository.findAll();      
  }

  findOne(id: number) {
    return this.countRepository.findOne({
      where: {
        id
      } 
    })
  }

  update(id: number, updateCountDto: UpdateCountDto) {
    return this.countRepository.update(updateCountDto, {
      where: {
        id
      }
    })
  }

  remove(id: number) {
    return this.countRepository.destroy({
      where: {
        id
      }
    })
  }
}
