import { CreateUserDTO } from "../../Domain/DTOs/users/CreateUserDTO";
import { User } from "../../Domain/models/User";
import { IUserRepository } from "../../Domain/repositories/users/IUserRepository";
import { IAuthService } from "../../Domain/services/auth/IAuthService";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthService implements IAuthService {
  private readonly saltRounds: number = parseInt(process.env.SALT_ROUNDS || "10", 10);

  public constructor(private userRepository: IUserRepository) {}

  async prijava(mejl: string, lozinka: string): Promise<string> {
    const user = await this.userRepository.getByEmail(mejl);
    if (user.id === 0) {
      return ""; // neispravan mejl
    }

    const validPassword = await bcrypt.compare(lozinka, user.lozinka);
    if (!validPassword) {
      return ""; // neispravna lozinka
    }

    // ⬇️ dodato korisnickoIme (mejl) u JWT da se poklopi sa frontend AuthProvider-om
    const token = jwt.sign(
      {
        id: user.id,
        uloga: user.uloga,
        korisnickoIme: user.mejl,
      },
      process.env.JWT_SECRET ?? "",
      { expiresIn: "6h" }
    );

    return token;
  }

  async registracija(user: CreateUserDTO): Promise<string> {
    const existingUser = await this.userRepository.getByEmail(user.mejl);
    if (existingUser.id !== 0) {
      return ""; // korisnik već postoji
    }

    const hashedPassword = await bcrypt.hash(user.lozinka, this.saltRounds);

    const newUser = await this.userRepository.create(
      new User(0, user.uloga, user.ime, user.prezime, user.mejl, hashedPassword)
    );

    // ⬇️ takođe dodato korisnickoIme u token posle registracije
    const token = jwt.sign(
      {
        id: newUser.id,
        uloga: newUser.uloga,
        korisnickoIme: newUser.mejl,
      },
      process.env.JWT_SECRET ?? "",
      { expiresIn: "6h" }
    );

    return token;
  }
}
