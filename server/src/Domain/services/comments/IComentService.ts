import { AddCommentDto } from "../../DTOs/comments/AddCommnetDto";
import { CommentDto } from "../../DTOs/comments/CommentDto";

export interface ICommentService {
  updateComment(comment: CommentDto): Promise<CommentDto>;
  deleteComment(id: number): Promise<boolean>;
	getCommentsForVest(postId: number): Promise<CommentDto[]>;
  getCommentById(id: number): Promise<CommentDto>;
  createComment(comment: AddCommentDto): Promise<CommentDto>;
}