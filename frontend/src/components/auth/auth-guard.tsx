"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export function AuthGuard({ children, requireAuth = true }: AuthGuardProps) {
  const { user, token, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    const isAuthenticated = !!(user && token);

    // For auth pages (/auth)
    if (!requireAuth) {
      if (isAuthenticated) {
        router.replace("/dashboard");
        return;
      } else {
        setShouldRender(true);
        return;
      }
    }

    // For protected pages
    if (requireAuth) {
      if (!isAuthenticated) {
        router.replace("/auth");
        return;
      } else {
        setShouldRender(true);
        return;
      }
    }
  }, [user, token, isLoading, requireAuth, router, pathname]);

  if (isLoading || !shouldRender) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return <>{children}</>;
}
