import { AddCommentDto } from "../../DTOs/comments/AddCommnetDto";
import { CommentDto } from "../../DTOs/comments/CommentDto";

export interface ICommentService {
	getCommentsForVest(postId: number): Promise<CommentDto[]>;
  getCommentById(id: number): Promise<CommentDto>;
  createComment(comment: AddCommentDto): Promise<CommentDto>;
}