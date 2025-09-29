export function EmptyStateRow({ colSpan }: { colSpan: number }) {
  return (
    <tr>
      <td colSpan={colSpan} className="py-12 text-center text-muted-foreground">
        No trains scheduled.
      </td>
    </tr>
  );
}
