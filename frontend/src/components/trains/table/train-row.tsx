import { TrainSchedule } from "@/types/train";
import { memo } from "react";
import { formatDateTime } from "../utils/time";
import { TrainStatusBadge } from "./train-status-badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

export const TrainRow = memo(function TrainRow({
  train,
  onEdit,
  onDelete,
}: {
  train: TrainSchedule;
  onEdit: (t: TrainSchedule) => void;
  onDelete: (t: TrainSchedule) => void;
}) {
  return (
    <tr className="border-b border-border hover:bg-muted/30 transition-colors">
      <td className="p-4">
        <div className="font-medium text-card-foreground">
          {train.trainName}
        </div>
        <div className="text-sm text-muted-foreground">ID: {train.id}</div>
      </td>

      <td className="p-4">
        <div className="text-card-foreground">{train.fromStation}</div>
        <div className="text-sm text-muted-foreground">→ {train.toStation}</div>
      </td>

      <td className="p-4">
        <div className="text-card-foreground">
          {formatDateTime(train.departureTime)}
        </div>
      </td>

      <td className="p-4">
        <TrainStatusBadge status={train.status} />
      </td>

      <td className="p-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(train)}
            className="h-8 w-8 p-0 hover:bg-muted cursor-pointer"
            aria-label={`Edit ${train.trainName}`}
          >
            <Edit className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(train)}
            className="h-8 w-8 p-0 hover:bg-destructive/20 hover:text-destructive cursor-pointer"
            aria-label={`Delete ${train.trainName}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
});
