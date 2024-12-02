import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

interface ApiResponse<T = any> {
  data: T;
  success: boolean;
  message?: string;
}

interface ErrorResponse {
  message?: string;
}

class ApiClient {
  private client: AxiosInstance;
  private static instance: ApiClient;

  private constructor() {
    this.client = axios.create({
      baseURL: "http://localhost:8080/api",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ErrorResponse>) => {
        const errorResponse = {
          success: false,
          message: "An error occurred",
          data: null,
        };

        if (error.response) {
          const responseData = error.response.data;

          switch (error.response.status) {
            case 401:
              localStorage.clear();
              errorResponse.message = "Unauthorized access";
              break;
            case 403:
              errorResponse.message = "Forbidden access";
              break;
            case 404:
              errorResponse.message = "Resource not found";
              break;
            case 500:
              errorResponse.message = "Internal server error";
              break;
            default:
              errorResponse.message =
                responseData?.message || "Something went wrong";
          }
        } else if (error.request) {
          errorResponse.message = "No response from server";
        }

        return Promise.reject(errorResponse);
      },
    );
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  async get<T>(url: string, params?: any): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.client.get(url, { params });
      return { success: true, data: response.data };
    } catch (error: any) {
      throw error;
    }
  }

  async post<T>(url: string, data: any): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.client.post(url, data);
      return { success: true, data: response.data };
    } catch (error: any) {
      throw error;
    }
  }

  async delete<T>(url: string, params?: any): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.client.delete(url, {
        params,
      });
      return { success: true, data: response.data };
    } catch (error: any) {
      throw error;
    }
  }

  async put<T>(url: string, data: any): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.client.put(url, data);
      return { success: true, data: response.data };
    } catch (error: any) {
      throw error;
    }
  }

  async patch<T>(url: string, data: any): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.client.patch(url, data);
      return { success: true, data: response.data };
    } catch (error: any) {
      throw error;
    }
  }
}

export const apiClient = ApiClient.getInstance();
