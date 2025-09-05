import axios from "axios";
import type { Tag } from "../../models/tags/Tag";
import type { ApiResponse } from "../../types/common/ApiResponse";
import type { ITagApiService } from "./ITagApiService";

const TAGS_API_URL: string = import.meta.env.VITE_API_URL + "tags";

export const tagApi: ITagApiService = {
	tagsForVest: async function (id_vesti: number): Promise<ApiResponse<Tag[]>> {
		try {
			const res = await axios.get<ApiResponse<Tag[]>>(
				`${TAGS_API_URL}/for/${id_vesti}`
			);
			return res.data;
		} catch (error) {
			let message = "Greška prilikom ucitavanja tagova!";
			if (axios.isAxiosError(error)) {
				message = error.response?.data?.message || message;
			}
			return {
				success: false,
				message,
				data: [],
			};
		}
	},

	addTag: async function (
		token: string,
		id_vesti: number,
		naziv: string
	): Promise<ApiResponse<boolean>> {
		try {
			const res = await axios.post<ApiResponse<boolean>>(`${TAGS_API_URL}/`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
				data: {
					id_vesti: id_vesti,
					naziv: naziv,
				},
			});
			return res.data;
		} catch (error) {
			let message = "Greška prilikom ucitavanja tagova!";
			if (axios.isAxiosError(error)) {
				message = error.response?.data?.message || message;
			}
			return {
				success: false,
				message,
				data: false,
			};
		}
	},
	removeTag: async function (
		token: string,
		id_vesti: number,
		naziv: string
	): Promise<ApiResponse<boolean>> {
		try {
			const res = await axios.delete<ApiResponse<boolean>>(
				`${TAGS_API_URL}/${id_vesti}/${naziv}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return res.data;
		} catch (error) {
			let message = "Greška prilikom ucitavanja tagova!";
			if (axios.isAxiosError(error)) {
				message = error.response?.data?.message || message;
			}
			return {
				success: false,
				message,
				data: false,
			};
		}
	},
};
 