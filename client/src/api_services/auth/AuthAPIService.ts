import type { AuthResponse } from "../../types/auth/AuthResponse";
import type { RegisterUserType } from "../../types/users/RegisterUserType";
import type { IAuthAPIService } from "./IAuthAPIService";
import axios from "axios";

const API_URL: string = import.meta.env.VITE_API_URL + "auth";

export const authApi: IAuthAPIService = {
	async prijava(mejl: string, lozinka: string): Promise<AuthResponse> {
		try {
      console.log(`Trying to POST: \n\t ${API_URL}/login`);
			const res = await axios.post<AuthResponse>(`${API_URL}/login`, {
				mejl,
				lozinka,
			});
			return res.data;
		} catch (error) {
			let message = "Greška prilikom prijave.";
			if (axios.isAxiosError(error)) {
				message = error.response?.data?.message || message;
			}
			return {
				success: false,
				message,
				data: undefined,
			};
		}
	},

	async registracija(user: RegisterUserType): Promise<AuthResponse> {
		try {
			const res = await axios.post<AuthResponse>(`${API_URL}/register`, user);

			return res.data;
		} catch (error) {
			let message = "Greška prilikom registracije.";
			if (axios.isAxiosError(error)) {
				message = error.response?.data?.message || message;
			}
			return {
				success: false,
				message,
				data: undefined,
			};
		}
	},
};
