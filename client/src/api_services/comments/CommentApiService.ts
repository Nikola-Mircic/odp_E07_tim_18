import axios from "axios";
import type { CommentDto } from "../../models/comments/CommentDto";
import type { AddCommentType } from "../../types/comments/AddCommentType";
import type { ApiResponse } from "../../types/common/ApiResponse";
import type { ICommentApIService } from "./ICommentsApiService";
import { data } from "react-router-dom";

const COMMENTS_API_URL: string = import.meta.env.VITE_API_URL + "comments";

export const commentApi: ICommentApIService = {
	getCommentsForVest: async function (
		vestId: number
	): Promise<ApiResponse<CommentDto[]>> {
		try {
			const res = await axios.get<ApiResponse<CommentDto[]>>(
				`${COMMENTS_API_URL}/for/${vestId}`
			);

			return res.data;
		} catch (error) {
			let message = "Greška prilikom ucitavanja komentara!";
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

	getCommentById: async function (id: number): Promise<ApiResponse<CommentDto>> {
		try {
			const res = await axios.get<ApiResponse<CommentDto>>(
				`${COMMENTS_API_URL}/id/${id}`
			);

			return res.data;
		} catch (error) {
			let message = "Greška prilikom ucitavanja komentara!";
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

	createComment: async function (comment: AddCommentType): Promise<ApiResponse<CommentDto>> {
		try{
      const res = await axios.post<ApiResponse<CommentDto>>(
        `${COMMENTS_API_URL}/comments/`,
        {
          data: comment
        }
      )

      return res.data;
    }catch (error) {
      let message = "Greška prilikom ucitavanja komentara!";
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