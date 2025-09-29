import api from "./api";
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  User,
} from "@/types/auth";

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    console.log("login", credentials);
    const response = await api.post<AuthResponse>("/auth/login", credentials);
    return response.data;
  },

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/register", userData);
    return response.data;
  },

  async getProfile(): Promise<User> {
    const response = await api.get<User>("/auth/profile");
    return response.data;
  },

  logout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
    }
  },

  getStoredToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("auth_token");
    }
    return null;
  },

  getStoredUser(): User | null {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("auth_user");
      return user ? JSON.parse(user) : null;
    }
    return null;
  },

  setStoredAuth(token: string, user: User) {
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", token);
      localStorage.setItem("auth_user", JSON.stringify(user));
    }
  },
};
