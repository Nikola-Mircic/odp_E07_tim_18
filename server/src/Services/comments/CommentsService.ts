import test from "node:test";
import { AddCommentDto } from "../../Domain/DTOs/comments/AddCommnetDto";
import { CommentDto } from "../../Domain/DTOs/comments/CommentDto";
import { ICommentRepository } from "../../Domain/repositories/comment/ICommentRepository";
import { ICommentService } from "../../Domain/services/comments/IComentService";
import { IUserService } from "../../Domain/services/users/IUserService";
import { IVestService } from "../../Domain/services/vesti/IVestService";

export class CommentsService implements ICommentService {
  public constructor(
    private commentRepository: ICommentRepository,
    private userService: IUserService,
    private vestService: IVestService
  ) {}
  
  async getCommentById(id: number): Promise<CommentDto> {
    try{
      var comment = await this.commentRepository.getCommentById(id);
      if(comment.id == 0)
        return new CommentDto();

      var autor = await this.userService.getUserById(comment.autorId);
      if(autor.id == 0)
        return new CommentDto();

      return new CommentDto(
        comment.id,
        autor,
        comment.vestId,
        comment.tekst,
        comment.vreme
      );
    }catch{
      return new CommentDto();
    }
  }

  async getCommentsForVest(vestId: number): Promise<CommentDto[]> {
    const comments = await this.commentRepository.getCommentsForVest(vestId);

    var result: CommentDto[] = [];

    for(let i=0;i<comments.length; ++i){
      let comment = await this.commentRepository.getCommentById(comments[i]);

      let autor = await this.userService.getUserById(comment.autorId);

      result.push(new CommentDto(
        comment.id,
        autor,
        comment.vestId,
        comment.tekst,
        comment.vreme
      ));
    }

    return result;
  }

  async createComment(comment: AddCommentDto): Promise<CommentDto> {
    let autor = await this.userService.getUserById(comment.autorId);
    if(autor.id == 0)
      return new CommentDto();

    let vest = await this.vestService.getVestById(comment.vestId);
    if(vest.id == 0)
      return new CommentDto();

    let created = await this.commentRepository.createComment(comment);
    if (created.id == 0)
      return new CommentDto();

		return new CommentDto(
			created.id,
			autor,
			created.vestId,
			created.tekst,
			created.vreme
		);
  }

}