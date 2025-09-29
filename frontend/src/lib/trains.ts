import api from "./api";
import type {
  TrainSchedule,
  CreateTrainRequest,
  UpdateTrainRequest,
} from "@/types/train";

export const trainService = {
  async getAll(search?: string): Promise<TrainSchedule[]> {
    const params = search ? { search } : {};
    const response = await api.get<TrainSchedule[]>("/train-schedules", {
      params,
    });
    return response.data;
  },

  async getById(id: number): Promise<TrainSchedule> {
    const response = await api.get<TrainSchedule>(`/train-schedules/${id}`);
    return response.data;
  },

  async create(data: CreateTrainRequest): Promise<TrainSchedule> {
    const response = await api.post<TrainSchedule>("/train-schedules", data);
    return response.data;
  },

  async update(id: number, data: UpdateTrainRequest): Promise<TrainSchedule> {
    const response = await api.patch<TrainSchedule>(
      `/train-schedules/${id}`,
      data
    );
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/train-schedules/${id}`);
  },
};
