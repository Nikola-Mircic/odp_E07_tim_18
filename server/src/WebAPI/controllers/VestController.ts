import { Router } from "express";
import { IVestService } from "../../Domain/services/vesti/IVestService";
import { CreateVestDTO } from "../../Domain/DTOs/vesti/CreateVestDTO";
import { StatusCodes } from "../../Domain/constants/StatusCodes";
import { IUserService } from "../../Domain/services/users/IUserService";

export class VestController {
  private router: Router;
  private vestService: IVestService;
  private userService: IUserService;

  public constructor(_vestService: IVestService, _userService: IUserService) {
    this.router = Router();
    this.vestService = _vestService;
    this.userService = _userService;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/vesti', this.createVest.bind(this));
    this.router.get('/vesti/id/:id', this.getVestById.bind(this));
    this.router.get("/vesti/id/:id/slicne", this.getSlicneVesti.bind(this));
    this.router.get("/vesti/najnovije", this.getNewestNews.bind(this));
    this.router.get(
			"/vesti/najpopularnije/",
			this.getNajpopularnijeVesti.bind(this)
		);
  }

  private async createVest(req: any, res: any): Promise<void> {
    const vestData: CreateVestDTO = req.body;

    var user = await this.userService.getUserById(vestData.autorId);
    if(user.id === 0) {
      res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: 'Invalid author ID' });
      return;
    }

    try {
      const newVest = await this.vestService.createVest(vestData);

      res.status(StatusCodes.CREATED).json({ success: true, data: newVest });
    } catch (error) {
      console.error('Error creating vest:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal server error' });
    }
  }

  private async getVestById(req: any, res: any): Promise<void> {
    const id = parseInt(req.params.id);

    try {
      var vest = await this.vestService.getVestById(id);

      if (vest.id !== 0) {
        res.status(StatusCodes.OK).json({ success: true, data: vest });
      } else {
        res.status(StatusCodes.NOT_FOUND).json({ success: false, message: 'Vest not found' });
      }
    } catch (error) {
      console.error('Error fetching vest by ID:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal server error' });
    }
  }

  private async getSlicneVesti(req: any, res: any): Promise<void> {
    const id = parseInt(req.params.id);

    try {
      const vesti = await this.vestService.getSlicneVesti(id);
      res.status(StatusCodes.OK).json({ success: true, data: vesti });

    } catch (error) {
      console.error('Error fetching similar vesti:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal server error' });
    }
  }

  private async getNewestNews(req: any, res: any): Promise<void> {
    const start = req.query.start;
    const end = req.query.end;

    try {
      const vesti = await this.vestService.getNewestNews(start, end);
      res.status(StatusCodes.OK).json({ success: true, data: vesti });

    } catch (error) {
      console.error('Error fetching newest vesti:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal server error' });
    }
  }

  private async getNajpopularnijeVesti(req: any, res: any): Promise<void> {
    const start = req.query.start;
		const end = req.query.end;

    try {
      const vesti = await this.vestService.getNajpolularnijeVesti(start, end);
      res.status(StatusCodes.OK).json({ success: true, data: vesti });

    } catch (error) {
      console.error('Error fetching most popular vesti:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal server error' });
    }
  }

  public getRouter(): Router {
    return this.router;
  }
}