import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
  MaxLength,
  Min,
} from 'class-validator';
import { TrainStatus } from '../entity/train-schedule.entity';

export class CreateTrainScheduleDto {
  @IsString({ message: 'Train name must be a string' })
  @IsNotEmpty({ message: 'Train name is required' })
  @MaxLength(50, { message: 'Train name must not exceed 50 characters' })
  trainName: string;

  @IsString({ message: 'From station must be a string' })
  @IsNotEmpty({ message: 'From station is required' })
  @MaxLength(100, { message: 'From station must not exceed 100 characters' })
  fromStation: string;

  @IsString({ message: 'To station must be a string' })
  @IsNotEmpty({ message: 'To station is required' })
  @MaxLength(100, { message: 'To station must not exceed 100 characters' })
  toStation: string;

  @IsNumber({}, { message: 'Departure time must be a number' })
  @Min(0, { message: 'Departure time must be a valid unix timestamp' })
  departureTime: number;

  @IsOptional()
  @IsEnum(TrainStatus, { message: 'Status must be a valid train status' })
  status?: TrainStatus;
}
