import { CreateUserDTO } from "../../Domain/DTOs/users/CreateUserDTO";
import { User } from "../../Domain/models/User";
import { IUserRepository } from "../../Domain/repositories/users/IUserRepository";
import { IAuthService } from "../../Domain/services/auth/IAuthService";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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
	async prijava(mejl: string, lozinka: string): Promise<string> {
		const user = await this.userRepository.getByEmail(mejl);

    console.log(user);
    if (user.id == 0) {
      return ""; // Neispravan mejl
    }

    console.log(lozinka);
		var validPassword: boolean = await bcrypt.compare(lozinka, user.lozinka);
    if (!validPassword) {
      return ""; // Neispravna lozinka
    }

		const token = jwt.sign(
			{
				id: user.id,
        korisnickoIme: `${user.ime} ${user.prezime}`,
				uloga: user.uloga,
			},
			process.env.JWT_SECRET ?? "",
			{ expiresIn: "6h" }
		);

    return token;
	}

	async registracija(user: CreateUserDTO): Promise<string> {
		const existingUser = await this.userRepository.getByEmail(user.mejl);

		if (existingUser.id !== 0) {
			return ""; // Korisnik već postoji
		}
		

		// Hash-ujemo lozinku pre čuvanja
		const hashedPassword = await bcrypt.hash(user.lozinka, this.saltRounds);

		const newUser = await this.userRepository.create(
			new User(0, user.uloga, user.ime, user.prezime, user.mejl, hashedPassword)
		);

		const token = jwt.sign(
			{
				id: newUser.id,
				korisnickoIme: `${user.ime} ${user.prezime}`,
				uloga: newUser.uloga,
			},
			process.env.JWT_SECRET ?? "",
			{ expiresIn: "6h" }
		);

		return token;
	}
}
