import { AddCommentDto } from "../../DTOs/comments/AddCommnetDto";
import { Comment  } from "../../models/Comment";

export interface ICommentRepository {
  getCommentById(id: number): Promise<Comment>;
  getCommentsForVest(vestId: number): Promise<number[]>;
  createComment(comment: AddCommentDto): Promise<Comment>;
  updateComment(comment: Comment): Promise<Comment>;
  deleteComment(id: number): Promise<boolean>;
}