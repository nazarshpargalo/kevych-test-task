import { Skeleton } from "@/components/ui/skeleton";

export function TrainSkeletonRow() {
  return (
    <tr className="border-b border-border">
      <td className="p-4">
        <Skeleton className="h-4 w-40" />
      </td>
      <td className="p-4">
        <Skeleton className="h-4 w-56" />
      </td>
      <td className="p-4">
        <Skeleton className="h-4 w-28" />
      </td>
      <td className="p-4">
        <Skeleton className="h-6 w-24" />
      </td>
      <td className="p-4">
        <Skeleton className="h-8 w-24" />
      </td>
    </tr>
  );
}
