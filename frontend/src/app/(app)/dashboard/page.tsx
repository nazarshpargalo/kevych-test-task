import { AuthGuard } from "@/components/auth/auth-guard";
import TrainManagementPage from "@/components/trains/train-management-page";

export default function DashboardPage() {
  return (
    <AuthGuard>
      <TrainManagementPage />
    </AuthGuard>
  );
}
