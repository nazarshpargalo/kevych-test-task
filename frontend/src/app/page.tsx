"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";

export default function HomePage() {
  const { user, token, isLoading } = useAuth();
  const router = useRouter();
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    // Wait for auth to finish loading
    if (isLoading || hasRedirected) return;

    // Mark as redirected to prevent multiple redirects
    setHasRedirected(true);

    // Simple one-time redirect based on auth state
    if (user && token) {
      router.replace("/dashboard");
    } else {
      router.replace("/auth");
    }
  }, [isLoading, user, token, router, hasRedirected]);

  // Always show loading state while on root page
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
  );
}
