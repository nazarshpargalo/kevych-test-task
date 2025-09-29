"use client";

import { useState } from "react";
import { toast } from "sonner";
import { trainService } from "@/lib/trains";
import type {
  TrainSchedule,
  CreateTrainRequest,
  UpdateTrainRequest,
} from "@/types/train";
import type { ApiError } from "@/types/api";

export function useTrainMutations() {
  const [loading, setLoading] = useState(false);

  const extractMessage = (err: ApiError) =>
    Array.isArray(err.message) ? err.message.join(", ") : err.message;

  const createTrain = async (
    data: CreateTrainRequest
  ): Promise<TrainSchedule> => {
    try {
      setLoading(true);
      const result = await trainService.create(data);
      toast.success("Train schedule created successfully");
      return result;
    } catch (e) {
      const apiError = e as ApiError;
      toast.error(
        `Failed to create train schedule: ${extractMessage(apiError)}`
      );
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const updateTrain = async (
    id: number,
    data: UpdateTrainRequest
  ): Promise<TrainSchedule> => {
    try {
      setLoading(true);
      const result = await trainService.update(id, data);
      toast.success("Train schedule updated successfully");
      return result;
    } catch (e) {
      const apiError = e as ApiError;
      toast.error(
        `Failed to update train schedule: ${extractMessage(apiError)}`
      );
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const deleteTrain = async (id: number): Promise<void> => {
    try {
      setLoading(true);
      await trainService.delete(id);
      toast.success("Train schedule deleted successfully");
    } catch (e) {
      const apiError = e as ApiError;
      toast.error(
        `Failed to delete train schedule: ${extractMessage(apiError)}`
      );
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { createTrain, updateTrain, deleteTrain, loading } as const;
}
