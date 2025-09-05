import type { ApiResponse } from "../../types/common/ApiResponse";
import type { RegisterUserType } from "../../types/users/RegisterUserType";

/**
 * Interfejs za Auth API servis.
 */
export interface IAuthAPIService {
	prijava(mejl: string, lozinka: string): Promise<ApiResponse<string>>;
	registracija(user: RegisterUserType): Promise<ApiResponse<string>>;
}