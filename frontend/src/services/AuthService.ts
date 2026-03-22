import $api from "../http";

import type { AxiosResponse } from "axios";
import type { AuthResponse } from "../models/response/AuthResponse";
import type { RegisterRequest } from "../models/request/IRegister";

export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/login", { email, password });
  }
  static async register(
    data: RegisterRequest
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/register", data);
  }
  static async logout(): Promise<void> {
    return $api.post("/logout");
  }
  static async refresh(): Promise<AxiosResponse<AuthResponse>> {
    return $api.get<AuthResponse>("/refresh");
  }
}
