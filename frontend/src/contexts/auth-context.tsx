"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { toast } from "sonner";
import { authService } from "@/lib/auth";
import type { AuthContextType, User, RegisterRequest } from "@/types/auth";
import type { ApiError } from "@/types/api";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = authService.getStoredToken();
        const storedUser = authService.getStoredUser();

        if (storedToken && storedUser) {
          // Optionally verify token is still valid by fetching profile
          try {
            const profile = await authService.getProfile();
            setToken(storedToken);
            setUser(profile);
          } catch (error) {
            // Token is invalid, clear storage
            console.error("Token validation failed:", error);
            authService.logout();
            setToken(null);
            setUser(null);
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        // Clear any corrupted auth data
        authService.logout();
        setToken(null);
        setUser(null);
      } finally {
        // Always finish loading, even if there's an error
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await authService.login({ email, password });

      setToken(response.access_token);
      setUser(response.user);
      authService.setStoredAuth(response.access_token, response.user);

      toast.success("Logged in successfully!");
    } catch (error) {
      const apiError = error as ApiError;
      const errorMessage = Array.isArray(apiError.message)
        ? apiError.message.join(", ")
        : apiError.message || "Invalid credentials";
      toast.error(`Login Failed: ${errorMessage}`);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterRequest) => {
    try {
      setIsLoading(true);
      const response = await authService.register(data);

      setToken(response.access_token);
      setUser(response.user);
      authService.setStoredAuth(response.access_token, response.user);

      toast.success("Account created successfully!");
    } catch (error) {
      const apiError = error as ApiError;
      const errorMessage = Array.isArray(apiError.message)
        ? apiError.message.join(", ")
        : apiError.message || "Registration failed";
      toast.error(`Registration Failed: ${errorMessage}`);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    authService.logout();
    toast.success("You have been logged out successfully.");
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
