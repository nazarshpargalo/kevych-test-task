export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string | string[];
  error: string;
  statusCode: number;
}
