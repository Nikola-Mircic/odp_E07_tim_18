import type { CommentDto } from "../../models/comments/CommentDto";
import type { AddCommentType } from "../../types/comments/AddCommentType";
import type { ApiResponse } from "../../types/common/ApiResponse";

export interface ICommentApIService {
	/**
	 * **getCommentsForVest** - Vraca sve komentare vezane za vest sa
	 * id-jem: ```vestId```
	 * @param vestId - Id vesti za koju se traze komentari
	 * @returns Niz komentara na vest
	 */
	getCommentsForVest(
		vestId: number
	): Promise<ApiResponse<CommentDto[]>>;

	/**
	 * **getCommentById** - Vraca komentar za prosledjeni ```id```
	 * @param id - Id po kome se trazi komentar
	 * @returns Komentar sa datim id
	 */
	getCommentById(id: number): Promise<ApiResponse<CommentDto>>;

	/**
	 * **createComment** - Pravi komentar sa prosledjenim podacima
	 * @param comment - *AddCommentType* sa pdoacima
	 * @returns Napravljeni komentar
	 */
	createComment(
		token: string,
		comment: AddCommentType
	): Promise<ApiResponse<CommentDto>>;
}