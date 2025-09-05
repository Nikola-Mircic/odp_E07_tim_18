import { Request, Response, Router } from 'express';
import { IAuthService } from '../../Domain/services/auth/IAuthService';
import { validacijaPodatakaAuth } from '../validators/auth/RegisterValidator';
import { CreateUserDTO } from '../../Domain/DTOs/users/CreateUserDTO';
import { StatusCodes } from '../../Domain/constants/StatusCodes';

export class AuthController {
  private router: Router;
  private authService: IAuthService;

  constructor(authService: IAuthService) {
    this.router = Router();
    this.authService = authService;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/auth/login', this.prijava.bind(this));
    this.router.post('/auth/register', this.registracija.bind(this));
  }

  /**
   * POST /api/v1/auth/login
   * Prijava korisnika
   */
  private async prijava(req: Request, res: Response): Promise<void> {
    try {
      const { mejl, lozinka } = req.body;

      // Validacija input parametara
      const rezultat = validacijaPodatakaAuth(mejl, lozinka);

      if (!rezultat.uspesno) {
        res
					.status( StatusCodes.BAD_REQUEST )
					.json({ success: false, message: rezultat.poruka });
        return;
      }

      const result = await this.authService.prijava(mejl, lozinka);

      // Proveravamo da li je prijava uspešna
      if (result.length > 0) {
        res.status( StatusCodes.OK ).json({success: true, message: 'Uspešna prijava', data: { token: result }});
        return;
      } else {
        res.status( StatusCodes.UNAUTHORIZED ).json({success: false, message: 'Неисправно корисничко име или лозинка'});
        return;
      }
    } catch (error) {
      console.log(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: error});
    }
  }

  /**
   * POST /api/v1/auth/register
   * Registracija novog korisnika
   */
  private async registracija(req: Request, res: Response): Promise<void> {
    try {
      const user: CreateUserDTO = req.body;

      const rezultat = validacijaPodatakaAuth(user.mejl, user.lozinka);

      if (!rezultat.uspesno) {
        res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: rezultat.poruka });
        return;
      }

      const result = await this.authService.registracija(user);

      // Proveravamo da li je registracija uspešna
      if (result.length > 0) {
        res.status(StatusCodes.OK).json({success: true, message: 'Uspešna registracija', data: { token: result }});
      } else {
        res.status(StatusCodes.BAD_REQUEST).json({success: false, message: 'Регистрација није успела. Корисничко име већ постоји.', });
      }
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: error});
    }
  }

  /**
   * Getter za router
   */
  public getRouter(): Router {
    return this.router;
  }
}