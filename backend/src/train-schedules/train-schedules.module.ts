import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainSchedulesService } from './train-schedules.service';
import { TrainSchedulesController } from './train-schedules.controller';
import { TrainSchedule } from './entity/train-schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrainSchedule])],
  controllers: [TrainSchedulesController],
  providers: [TrainSchedulesService],
  exports: [TrainSchedulesService],
})
export class TrainSchedulesModule {}
