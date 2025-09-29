import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum TrainStatus {
  ON_TIME = 'On Time',
  DELAYED = 'Delayed',
  BOARDING = 'Boarding',
  CANCELLED = 'Cancelled',
  DEPARTED = 'Departed',
}

@Entity('train_schedules')
export class TrainSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  trainName: string;

  @Column()
  fromStation: string;

  @Column()
  toStation: string;

  @Column({ type: 'bigint' })
  departureTime: number; // Unix timestamp

  @Column({
    type: 'enum',
    enum: TrainStatus,
    default: TrainStatus.ON_TIME,
  })
  status: TrainStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
