import axios from "axios";
import type { CommentDto } from "../../models/comments/CommentDto";
import type { AddCommentType } from "../../types/comments/AddCommentType";
import type { ApiResponse } from "../../types/common/ApiResponse";
import type { ICommentApIService } from "./ICommentsApiService";
import { data } from "react-router-dom";

const COMMENTS_API_URL: string = import.meta.env.VITE_API_URL + "comments";

const commentApi: ICommentApIService = {
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

  getCommentById: async function (
    id: number
  ): Promise<ApiResponse<CommentDto>> {
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

  createComment: async function (
    token: string,
    comment: AddCommentType
  ): Promise<ApiResponse<CommentDto>> {
    try {
      console.log("Creating comment with data:", comment);
      console.log(`Bearer ${token}`);
      const res = await axios.post<ApiResponse<CommentDto>>(
				`${COMMENTS_API_URL}/`,
				{
					...comment,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
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
  updateComment: async function (token: string, comment: CommentDto): Promise<ApiResponse<CommentDto>> {
    try{
      const res = await axios.post<ApiResponse<CommentDto>>(
				`${COMMENTS_API_URL}/update/`,
				{
					...comment,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

      return res.data;
    }catch (error) {
      let message = "Greška prilikom izmena komentara!";
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
  removeComment: async function (token: string, id: number): Promise<ApiResponse<boolean>> {
    try{
      const res = await axios.delete<ApiResponse<boolean>>(
				`${COMMENTS_API_URL}/?id=${id}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);

      return res.data;
    }catch (error) {
      let message = "Greška prilikom brisanja komentara!";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }
      return {
        success: false,
        message,
      };
    }
  }
};

export default commentApi;