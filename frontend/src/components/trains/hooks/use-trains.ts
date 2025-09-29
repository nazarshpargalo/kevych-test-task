"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { trainService } from "@/lib/trains";
import type { TrainSchedule } from "@/types/train";
import type { ApiError } from "@/types/api";

export function useTrains(search?: string) {
  const [trains, setTrains] = useState<TrainSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchTrains = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await trainService.getAll(search);
      setTrains(data);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError);
      toast.error("Failed to load train schedules");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrains();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return { trains, loading, error, refetch: fetchTrains } as const;
}
