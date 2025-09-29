import { AuthGuard } from "@/components/auth/auth-guard";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard requireAuth={false}>
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        {children}
      </div>
    </AuthGuard>
  );
}
