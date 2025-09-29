"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Train } from "lucide-react";
import { TrainManagementTable } from "./table/train-management-table";
import { TrainFormDialog } from "./dialogs/train-form-dialog";
import { DeleteConfirmDialog } from "./dialogs/delete-confirm-dialog";
import { useTrains } from "./hooks/use-trains";
import { useTrainMutations } from "./hooks/use-train-mutations";
import type {
  TrainSchedule,
  CreateTrainRequest,
  UpdateTrainRequest,
} from "@/types/train";

export default function TrainManagementPage() {
  const [query, setQuery] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editing, setEditing] = useState<TrainSchedule | null>(null);
  const [deleting, setDeleting] = useState<TrainSchedule | null>(null);

  const { trains, loading, error, refetch } = useTrains(query);
  const {
    createTrain,
    updateTrain,
    deleteTrain,
    loading: mutating,
  } = useTrainMutations();

  const handleCreate = async (data: CreateTrainRequest) => {
    await createTrain(data);
    setIsAddOpen(false);
    refetch();
  };

  const handleUpdate = async (id: number, data: UpdateTrainRequest) => {
    await updateTrain(id, data);
    setEditing(null);
    refetch();
  };

  const handleDelete = async (id: number) => {
    await deleteTrain(id);
    setDeleting(null);
    refetch();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <Input
            placeholder="Search by name/station…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full sm:w-72"
          />
          <Button
            className="w-full sm:w-auto shrink-0 cursor-pointer"
            onClick={() => setIsAddOpen(true)}
          >
            Add Train
          </Button>
        </div>

        <Card className="border-border bg-card">
          <CardHeader className="border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Train className="h-5 w-5 text-primary" />
                <CardTitle className="text-card-foreground">
                  Train Schedules
                </CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <TrainManagementTable
              trains={trains}
              loading={loading || mutating}
              error={error?.message as string}
              onEdit={(t) => setEditing(t)}
              onDelete={(t) => setDeleting(t)}
            />
          </CardContent>
        </Card>

        {/* Dialogs */}
        <TrainFormDialog
          open={isAddOpen}
          onOpenChange={setIsAddOpen}
          onSubmit={handleCreate}
          title="Add New Train"
        />

        <TrainFormDialog
          open={!!editing}
          onOpenChange={(open) => !open && setEditing(null)}
          onSubmit={(data) => editing && handleUpdate(editing.id, data)}
          initialData={editing ?? undefined}
          title="Edit Train"
        />

        <DeleteConfirmDialog
          open={!!deleting}
          onOpenChange={(open: boolean) => !open && setDeleting(null)}
          onConfirm={() => deleting && handleDelete(deleting.id)}
          trainName={deleting?.trainName || ""}
        />
      </div>
    </div>
  );
}
