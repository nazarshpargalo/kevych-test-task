"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { type TrainSchedule, TrainStatus } from "@/types/train";
import Input from "@/components/ui/form/index";

const trainFormSchema = z.object({
  trainName: z
    .string()
    .min(1, "Train name is required")
    .min(2, "Train name must be at least 2 characters"),
  fromStation: z
    .string()
    .min(1, "From station is required")
    .min(2, "Station name must be at least 2 characters"),
  toStation: z
    .string()
    .min(1, "To station is required")
    .min(2, "Station name must be at least 2 characters"),
  departureTime: z.number().positive("Departure time is required"),
  status: z.nativeEnum(TrainStatus),
});

type TrainFormData = z.infer<typeof trainFormSchema>;

interface TrainFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (
    data: Omit<TrainSchedule, "id" | "createdAt" | "updatedAt">
  ) => void;
  initialData?: TrainSchedule;
  title: string;
}

export function TrainFormDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  title,
}: TrainFormDialogProps) {
  const form = useForm<TrainFormData>({
    resolver: zodResolver(trainFormSchema),
    defaultValues: {
      trainName: "",
      fromStation: "",
      toStation: "",
      departureTime: Date.now(),
      status: TrainStatus.ON_TIME,
    },
  });

  useEffect(() => {
    if (open) {
      if (initialData) {
        form.reset({
          trainName: initialData.trainName,
          fromStation: initialData.fromStation,
          toStation: initialData.toStation,
          departureTime: +initialData.departureTime,
          status: initialData.status,
        });
      } else {
        form.reset({
          trainName: "",
          fromStation: "",
          toStation: "",
          departureTime: Date.now(),
          status: TrainStatus.ON_TIME,
        });
      }
    }
  }, [initialData, open, form]);

  const handleSubmit = (data: TrainFormData) => {
    onSubmit({
      trainName: data.trainName,
      fromStation: data.fromStation,
      toStation: data.toStation,
      departureTime: data.departureTime,
      status: data.status,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-popover border-border">
        <DialogHeader>
          <DialogTitle className="text-popover-foreground">{title}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <Input.Default
              name="trainName"
              label="Train Name"
              placeholder="e.g., Express 101"
              className="bg-background border-input text-foreground"
            />

            <Input.Default
              name="fromStation"
              label="From Station"
              placeholder="e.g., New York Central"
              className="bg-background border-input text-foreground"
            />

            <Input.Default
              name="toStation"
              label="To Station"
              placeholder="e.g., Washington Union"
              className="bg-background border-input text-foreground"
            />

            <Input.DateTime
              name="departureTime"
              label="Departure Time"
              className="bg-background border-input text-foreground"
            />

            <Input.Select
              name="status"
              label="Status"
              placeholder="Select status"
              options={Object.values(TrainStatus).map((status) => ({
                value: status,
                name: status,
              }))}
            />

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={form.formState.isSubmitting}
              >
                {initialData ? "Update" : "Add"} Train
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
