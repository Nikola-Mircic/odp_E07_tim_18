import { UserLoginDto } from "../../DTOs/auth/UserLoginDto";
import { CreateUserDTO } from "../../DTOs/users/CreateUserDTO";

export interface IAuthService {
	/**
	 * Prijavljuje korisnika sa datim korisničkim imenom i lozinkom.
	 * @param mejl - Mejl korisnika.
	 * @param lozinka - Lozinka korisnika.
	 * @returns ID korisnika ako je prijava uspesna ( 0 ako nije ).
	 */
	prijava(mejl: string, lozinka: string): Promise<number>;

	/**
	 * Registruje novog korisnika sa datim korisničkim imenom i lozinkom.
	 * @param user - Podaci o korisniku za registraciju.
	 * @returns ID korisnika ako je registracija uspesna ( 0 ako nije ).
	 */
	registracija(user: CreateUserDTO): Promise<number>;
}
