import { blob } from "stream/consumers";
import { UserLoginDto } from "../../Domain/DTOs/auth/UserLoginDto";
import { CreateUserDTO } from "../../Domain/DTOs/users/CreateUserDTO";
import { User } from "../../Domain/models/User";
import { IUserRepository } from "../../Domain/repositories/users/IUserRepository";
import { IAuthService } from "../../Domain/services/auth/IAuthService";
import bcrypt from "bcryptjs";

export class AuthService implements IAuthService {
	private readonly saltRounds: number = parseInt(
		process.env.SALT_ROUNDS || "10",
		10
	);

	public constructor(private userRepository: IUserRepository) {}

	/**
	 * Prijava korisnika
	 * @param mejl - Korisničko ime korisnika
	 * @param lozinka - Lozinka korisnika
	 * @return userLoginDto - DTO sa userid i mejlom
	 */
	async prijava(mejl: string, lozinka: string): Promise<number> {
		const user = await this.userRepository.getByEmail(mejl);

    var validPassword: boolean = await bcrypt.compare(lozinka, user.lozinka);

    console.log("Valid password: " + validPassword);
    console.log("For user: " + user.mejl + " with id: " + user.id);

		if (user.id !== 0 && (await bcrypt.compare(lozinka, user.lozinka))) {
			return user.id;
		}

		return 0; // Neispravno korisničko ime ili lozinka
	}

	async registracija(user: CreateUserDTO): Promise<number> {
		const existingUser = await this.userRepository.getByEmail(user.mejl);

		if (existingUser.id !== 0) {
			return 0; // Korisnik već postoji
		}

		// Hash-ujemo lozinku pre čuvanja
		const hashedPassword = await bcrypt.hash(user.lozinka, this.saltRounds);

		const newUser = await this.userRepository.create(
      new User(0, user.editor, user.ime, user.prezime, user.mejl, hashedPassword)
    );

		return newUser.id; // Registracija nije uspela
	}
}
