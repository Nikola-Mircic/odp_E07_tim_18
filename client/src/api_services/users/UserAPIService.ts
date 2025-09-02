import axios from "axios";
import type { IUserAPIService } from "./IUserAPIService";
import type { UserDto } from "../../models/users/UserDTO";
import type { ApiResponse } from "../../types/common/ApiResponse";

const USER_API_URL: string = import.meta.env.VITE_API_URL + "users";

export const UserAPI : IUserAPIService = {
  async getUserById(id: number): Promise<ApiResponse<UserDto>> {
     try {
				const res = await axios.get<ApiResponse<UserDto>>(
					`${USER_API_URL}/id/${id}`
				);
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