import { Router } from "express";
import { ICommentService } from "../../Domain/services/comments/IComentService";
import { StatusCodes } from "../../Domain/constants/StatusCodes";
import { CommentDto } from "../../Domain/DTOs/comments/CommentDto";
import { AddCommentDto } from "../../Domain/DTOs/comments/AddCommnetDto";

export class CommentController {
	private router: Router;
	private commentService: ICommentService;

	constructor(commentService: ICommentService) {
		this.router = Router();
		this.commentService = commentService;
		this.initializeRoutes();
	}

	private initializeRoutes(): void {
		this.router.get("/comments/id/:id", this.getById.bind(this));
		this.router.get("/comments/for/:vestId", this.getForVest.bind(this));
		this.router.post("/comments", this.createComment.bind(this));
	}

  public getRouter(): Router{
    return this.router;
  }

	private async getById(req: any, res: any): Promise<void> {
		try {
			const id = parseInt(req.params.id);

			if (isNaN(id)) {
				res
					.status(StatusCodes.BAD_REQUEST)
					.json({ success: false, message: `Neispravan id: ${id}` });
				return;
			}

			var comment = await this.commentService.getCommentById(id);
			if (comment.id == 0)
				res
					.status(StatusCodes.NOT_FOUND)
					.json({ success: false, message: `Nema komentara sa id: ${id}` });

			res.status(StatusCodes.OK).json({
				success: true,
				message: "NASAO GA!",
				data: comment,
			});
		} catch {
			res
				.status(StatusCodes.INTERNAL_SERVER_ERROR)
				.json({ success: false, message: "Nesto ne radi..." });
		}
	}

	private async getForVest(req: any, res: any): Promise<void> {
		try {
			const id = parseInt(req.params.vestId);

			if (isNaN(id)) {
				res
					.status(StatusCodes.BAD_REQUEST)
					.json({ success: false, message: `Neispravan id: ${id}` });
				return;
			}

			var comments = await this.commentService.getCommentsForVest(id);

			res.status(StatusCodes.OK).json({
				success: true,
				message: "NASAO IH!",
				data: comments,
			});
		} catch {
			res
				.status(StatusCodes.INTERNAL_SERVER_ERROR)
				.json({ success: false, message: "Nesto ne radi..." });
		}
	}

	private async createComment(req: any, res: any): Promise<void> {
		try {
			const comment: AddCommentDto = req.body;

			if (!comment) {
				res
					.status(StatusCodes.BAD_REQUEST)
					.json({ success: false, message: `Neispravan objekat poslat` });
				return;
			}

			var created = await this.commentService.createComment(comment);
			if (created.id == 0)
				res
					.status(StatusCodes.BAD_REQUEST)
					.json({ success: false, message: `Neuspelo dodavanje komentara...` });

			res.status(StatusCodes.CREATED).json({
				success: true,
				message: "DODAO GA!",
				data: comment,
			});
		} catch {
			res
				.status(StatusCodes.INTERNAL_SERVER_ERROR)
				.json({ success: false, message: "Nesto ne radi..." });
		}
	}
}
