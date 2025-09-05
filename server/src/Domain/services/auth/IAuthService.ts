import { UserLoginDto } from "../../DTOs/auth/UserLoginDto";
import { CreateUserDTO } from "../../DTOs/users/CreateUserDTO";

export interface IAuthService {
	/**
	 * Prijavljuje korisnika sa datim korisničkim imenom i lozinkom.
	 * @param mejl - Mejl korisnika.
	 * @param lozinka - Lozinka korisnika.
	 * @returns JWT token
	 */
	prijava(mejl: string, lozinka: string): Promise<string>;

	/**
	 * Registruje novog korisnika sa datim korisničkim imenom i lozinkom.
	 * @param user - Podaci o korisniku za registraciju.
	 * @returns JWT token
	 */
	registracija(user: CreateUserDTO): Promise<string>;
}
