import {
  IsOptional,
  IsString,
  IsNumber,
  IsEnum,
  MaxLength,
  Min,
} from 'class-validator';
import { TrainStatus } from '../entity/train-schedule.entity';

export class UpdateTrainScheduleDto {
  @IsOptional()
  @IsString({ message: 'Train name must be a string' })
  @MaxLength(50, { message: 'Train name must not exceed 50 characters' })
  trainName?: string;

  @IsOptional()
  @IsString({ message: 'From station must be a string' })
  @MaxLength(100, { message: 'From station must not exceed 100 characters' })
  fromStation?: string;

  @IsOptional()
  @IsString({ message: 'To station must be a string' })
  @MaxLength(100, { message: 'To station must not exceed 100 characters' })
  toStation?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Departure time must be a number' })
  @Min(0, { message: 'Departure time must be a valid unix timestamp' })
  departureTime?: number;

  @IsOptional()
  @IsEnum(TrainStatus, { message: 'Status must be a valid train status' })
  status?: TrainStatus;
}
