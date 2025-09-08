import axios from "axios";
import type { VestDto } from "../../models/vesti/VestDto";
import type { ApiResponse } from "../../types/common/ApiResponse";
import type { IVestApiService } from "./IVestAPIService";

const USER_API_URL: string = import.meta.env.VITE_API_URL + "vesti";

export const vestiApi: IVestApiService = {
	getVesti: async function (): Promise<ApiResponse<VestDto[]>> {
		try {
			const res = await axios.get<ApiResponse<VestDto[]>>(
				`${USER_API_URL}`
			);
			return res.data;
		} catch (error) {
			let message = "Greška prilikom ucitavanja vesti!";
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

	getById: async function (id: number): Promise<ApiResponse<VestDto>> {
		try {
			const res = await axios.get<ApiResponse<VestDto>>(
				`${USER_API_URL}/id/${id}`
			);
			return res.data;
		} catch (error) {
			let message = "Greška prilikom ucitavanja vesti!";
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
	getSlicneVesti: async function (id: number): Promise<ApiResponse<VestDto[]>> {
		try {
			const res = await axios.get<ApiResponse<VestDto[]>>(
				`${USER_API_URL}/id/${id}/slicne`
			);
			return res.data;
		} catch (error) {
			let message = "Greška prilikom ucitavanja vesti!";
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