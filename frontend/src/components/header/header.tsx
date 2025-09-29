"use client";

import { useAuth } from "@/contexts/auth-context";
import { LogOut, User } from "lucide-react";
import { Button } from "../ui/button";

export function Header() {
  const { user, logout } = useAuth();
  return (
    <header className="border-b border-border bg-background">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* App name on the left */}
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-foreground">
              Train Management System
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span>{`${user?.firstName} ${user?.lastName}`}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="flex items-center space-x-2 bg-transparent cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
