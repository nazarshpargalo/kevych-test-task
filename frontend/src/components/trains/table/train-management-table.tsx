"use client";

import { useMemo } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { TrainSchedule } from "@/types/train";
import { TrainSkeletonRow } from "./train-skeleton-row";
import { TrainRow } from "./train-row";
import { EmptyStateRow } from "./empty-state-row";

interface Props {
  trains: TrainSchedule[];
  loading?: boolean;
  error?: string;
  onEdit: (train: TrainSchedule) => void;
  onDelete: (train: TrainSchedule) => void;
}

export function TrainManagementTable({
  trains = [],
  loading = false,
  error,
  onEdit,
  onDelete,
}: Props) {
  const hasData = useMemo(() => trains.length > 0, [trains.length]);

  if (error) {
    return (
      <div className="p-4">
        <Alert variant="destructive">
          <AlertDescription>
            Failed to load train schedules: {error}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <caption className="sr-only">Train schedules</caption>

        <thead className="border-b border-border bg-muted/50">
          <tr>
            <th className="text-left p-4 font-medium text-muted-foreground">
              Train Name
            </th>
            <th className="text-left p-4 font-medium text-muted-foreground">
              Route
            </th>
            <th className="text-left p-4 font-medium text-muted-foreground">
              Departure
            </th>
            <th className="text-left p-4 font-medium text-muted-foreground">
              Status
            </th>
            <th className="text-left p-4 font-medium text-muted-foreground">
              Actions
            </th>
          </tr>
        </thead>

        <tbody aria-busy={loading || undefined}>
          {loading && !hasData
            ? Array.from({ length: 5 }).map((_, i) => (
                <TrainSkeletonRow key={i} />
              ))
            : trains.map((train) => (
                <TrainRow
                  key={train.id}
                  train={train}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}

          {!loading && !hasData && <EmptyStateRow colSpan={5} />}
        </tbody>
      </table>
    </div>
  );
}
