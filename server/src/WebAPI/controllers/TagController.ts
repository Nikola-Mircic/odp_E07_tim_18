import { Router } from "express";
import { ITagService } from "../../Domain/services/tags/ITagService";
import { StatusCodes } from "../../Domain/constants/StatusCodes";
import { Tag } from "../../Domain/models/Tag";

export class TagController {
	private router: Router;
	private service: ITagService;

	public constructor(service: ITagService) {
		this.router = Router();
		this.service = service;

		this.initializeRoutes();
	}

	private initializeRoutes(): void {
		this.router.get("/tags/for/:id_vest", this.getTagsFor.bind(this));
		this.router.post("/tags", this.addTag.bind(this));
		this.router.delete("/tags/:vest_id/:tag", this.removeTag.bind(this));
	}

	public getRouter(): Router {
		return this.router;
	}

	private async getTagsFor(req: any, res: any): Promise<void> {
		try {
			let id_vest = parseInt(req.params.id_vest);
			if (isNaN(id_vest))
				res.status(StatusCodes.BAD_REQUEST).json({
					success: false,
					message: `Pogresan id vesti: ${req.params.id_vest}`,
				});

			var tags = await this.service.getForVest(id_vest);

			res
				.status(StatusCodes.OK)
				.json({ success: true, message: "Tagovi za ovu vest", data: tags });
		} catch {
			res
				.status(StatusCodes.INTERNAL_SERVER_ERROR)
				.json({ success: false, message: "Nesto ne radi..." });
		}
	}

	private async addTag(req: any, res: any): Promise<void> {
		try {
			let tag: Tag = req.body;

			if (!tag)
				res.status(StatusCodes.BAD_REQUEST).json({
					success: false,
					message: `Neispravan tag`,
				});

			var success = await this.service.addTag(tag.id_vesti, tag.naziv);
			if (success) {
				res
					.status(StatusCodes.OK)
					.json({ success: success, message: "Tag dodat!" });
			} else {
				res.status(StatusCodes.BAD_REQUEST).json({
					success: success,
					message: `Tag [${tag.id_vesti}, ${tag.naziv}] nije dodat!`,
				});
			}
		} catch {
			res
				.status(StatusCodes.INTERNAL_SERVER_ERROR)
				.json({ success: false, message: "Nesto ne radi..." });
		}
	}

	private async removeTag(req: any, res: any): Promise<void> {
		try {
			let tag: Tag = req.body;

			if (!tag)
				res.status(StatusCodes.BAD_REQUEST).json({
					success: false,
					message: `Neispravan tag`,
				});

			var success = await this.service.removeTag(tag.id_vesti, tag.naziv);
			if (success) {
				res
					.status(StatusCodes.OK)
					.json({ success: success, message: "Tag sklonjen!" });
			} else {
				res.status(StatusCodes.BAD_REQUEST).json({
					success: success,
					message: `Tag [${tag.id_vesti}, ${tag.naziv}] nije sklonjen!`,
				});
			}
		} catch {
			res
				.status(StatusCodes.INTERNAL_SERVER_ERROR)
				.json({ success: false, message: "Nesto ne radi..." });
		}
	}
}