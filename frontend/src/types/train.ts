export enum TrainStatus {
  ON_TIME = "On Time",
  DELAYED = "Delayed",
  BOARDING = "Boarding",
  CANCELLED = "Cancelled",
  DEPARTED = "Departed",
}

export interface TrainSchedule {
  id: number;
  trainName: string;
  fromStation: string;
  toStation: string;
  departureTime: number; // Unix timestamp
  status: TrainStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTrainRequest {
  trainName: string;
  fromStation: string;
  toStation: string;
  departureTime: number;
  status?: TrainStatus;
}

export interface UpdateTrainRequest {
  trainName?: string;
  fromStation?: string;
  toStation?: string;
  departureTime?: number;
  status?: TrainStatus;
}
