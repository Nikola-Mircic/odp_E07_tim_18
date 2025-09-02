import axios from "axios";
import type { IUserAPIService } from "./IUserAPIService";
import type { UserResponse } from "../../types/users/UserResponse";

const USER_API_URL: string = import.meta.env.VITE_API_URL + "users";

export const UserAPI : IUserAPIService = {
  async getUserById(id: number): Promise<UserResponse> {
     try {
				const res = await axios.get<UserResponse>(`${USER_API_URL}/${id}`);
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
}