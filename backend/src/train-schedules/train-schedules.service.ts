import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrainSchedule } from './entity/train-schedule.entity';
import { CreateTrainScheduleDto } from './dto/create-train-schedule.dto';
import { UpdateTrainScheduleDto } from './dto/update-train-schedule.dto';

@Injectable()
export class TrainSchedulesService {
  constructor(
    @InjectRepository(TrainSchedule)
    private trainScheduleRepository: Repository<TrainSchedule>,
  ) {}

  async create(createDto: CreateTrainScheduleDto): Promise<TrainSchedule> {
    const trainSchedule = this.trainScheduleRepository.create(createDto);
    return this.trainScheduleRepository.save(trainSchedule);
  }

  async findAll(search?: string): Promise<TrainSchedule[]> {
    if (search) {
      return this.trainScheduleRepository
        .createQueryBuilder('train')
        .where(
          '(LOWER(train.trainName) LIKE LOWER(:search) OR ' +
            'LOWER(train.fromStation) LIKE LOWER(:search) OR ' +
            'LOWER(train.toStation) LIKE LOWER(:search))',
          { search: `%${search}%` },
        )
        .orderBy('train.departureTime', 'ASC')
        .getMany();
    }

    return this.trainScheduleRepository.find({
      order: { departureTime: 'ASC' },
    });
  }

  async findOne(id: number): Promise<TrainSchedule> {
    const trainSchedule = await this.trainScheduleRepository.findOne({
      where: { id },
    });

    if (!trainSchedule) {
      throw new NotFoundException('Train schedule not found');
    }

    return trainSchedule;
  }

  async update(
    id: number,
    updateDto: UpdateTrainScheduleDto,
  ): Promise<TrainSchedule> {
    const trainSchedule = await this.findOne(id);
    Object.assign(trainSchedule, updateDto);
    return this.trainScheduleRepository.save(trainSchedule);
  }

  async remove(id: number): Promise<void> {
    const trainSchedule = await this.findOne(id);
    await this.trainScheduleRepository.remove(trainSchedule);
  }
}
