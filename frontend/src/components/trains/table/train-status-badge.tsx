"use client";
import { Badge } from "@/components/ui/badge";
import { TrainStatus } from "@/types/train";

const statusClasses: Record<TrainStatus, string> = {
  [TrainStatus.ON_TIME]:
    "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  [TrainStatus.DELAYED]: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  [TrainStatus.BOARDING]: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  [TrainStatus.CANCELLED]: "bg-red-500/20 text-red-400 border-red-500/30",
  [TrainStatus.DEPARTED]: "bg-gray-500/20 text-gray-400 border-gray-500/30",
};

export function TrainStatusBadge({ status }: { status: TrainStatus }) {
  return (
    <Badge className={`${statusClasses[status]} font-medium`}>{status}</Badge>
  );
}
