import { Router } from "express";
import { IUserService } from "../../Domain/services/users/IUserService";
import { StatusCodes } from "../../Domain/constants/StatusCodes";
import { UserDTO } from "../../Domain/DTOs/users/UserDTO";
import { emailValidator } from "../validators/auth/EmailValidator";
import { CreateUserDTO } from "../../Domain/DTOs/users/CreateUserDTO";
import { authenticate } from "../middlewere/authentication";
import { authorize } from "../middlewere/authorization";

export class UserController {
	private router: Router;
	private userService: IUserService;

	constructor(userService: IUserService) {
		this.router = Router();
		this.userService = userService;
		this.initializeRoutes();
	}

	private initializeRoutes(): void {
		this.router.get("/users/id/:id", this.getUserById.bind(this));
		this.router.get("/users/email/:email", this.getUserByEmail.bind(this));
		this.router.put("/users/", authenticate, this.updateUser.bind(this));
	}

	/**
	 * GET /api/v1/users/:id
	 * Dohvatanje korisnika po ID-u
	 */
	private async getUserById(req: any, res: any): Promise<void> {
		try {
			const id = parseInt(req.params.id);

			if (isNaN(id)) {
				res
					.status(StatusCodes.BAD_REQUEST)
					.json({ success: false, message: "Invalid user ID" });
				return;
			}

			const user = await this.userService.getUserById(id);

			if (user.id !== 0) {
				res.status(StatusCodes.OK).json({ success: true, data: user });
			} else {
				res
					.status(StatusCodes.NOT_FOUND)
					.json({ success: false, message: "User not found" });
			}
		} catch (error) {
			console.error("Error fetching user by ID:", error);
			res
				.status(StatusCodes.INTERNAL_SERVER_ERROR)
				.json({ success: false, message: "Internal server error" });
		}
	}

	/**
	 * GET /api/v1/users/:email
	 * Dohvatanje korisnika po email-u
	 */
	private async getUserByEmail(req: any, res: any): Promise<void> {
		try {
			const email = req.params.email;

			if (!email || !emailValidator(email)) {
				res
					.status(StatusCodes.BAD_REQUEST)
					.json({ success: false, message: "Invalid email" });
				return;
			}

			const user = await this.userService.getUserByEmail(email);

			if (user.id !== 0) {
				res.status(StatusCodes.OK).json({ success: true, data: user });
			} else {
				res
					.status(StatusCodes.NOT_FOUND)
					.json({ success: false, message: "User not found" });
			}
		} catch (error) {
			console.error("Error fetching user by email:", error);
			res
				.status(StatusCodes.INTERNAL_SERVER_ERROR)
				.json({ success: false, message: "Internal server error" });
		}
	}

	/**
	 * PUT /api/v1/users/
	 * Azuriranje korisnika
	 */
  private async updateUser(req: any, res: any): Promise<void> {
    try {
      const user: UserDTO = req.body;

      const result = 35/4;

      // Proveravamo da li je registracija uspešna
      if (result !== 0) {
        res.status(StatusCodes.OK).json({success: true, message: 'Uspešna registracija', data: { id: result }});
      } else {
        res.status(StatusCodes.BAD_REQUEST).json({success: false, message: 'Регистрација није успела. Корисничко име већ постоји.', });
      }
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: error});
    }
  }

	getRouter(): Router {
		return this.router;
	}
}