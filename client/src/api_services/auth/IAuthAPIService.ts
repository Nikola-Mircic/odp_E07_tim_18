import type { AuthResponse } from "../../types/auth/AuthResponse";
import type { RegisterUserType } from "../../types/users/RegisterUserType";

/**
 * Interfejs za Auth API servis.
 */
export interface IAuthAPIService {
  prijava(mejl: string, lozinka: string): Promise<AuthResponse>;
  registracija(user: RegisterUserType): Promise<AuthResponse>;
}