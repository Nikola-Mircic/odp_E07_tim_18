import { CreateUserDTO } from "../../DTOs/users/CreateUserDTO";
import { UserDTO } from "../../DTOs/users/UserDTO";

export interface IUserService {
	/**
	 * getUserById - Vraća podatke o korisniku na osnovu ID-a
	 * @param id - ID korisnika
	 * @returns UserDTO - DTO sa podacima o korisniku
	 */
	getUserById(id: number): Promise<UserDTO>;

	/**
	 * getUserByEmail - Vraća podatke o korisniku na osnovu email-a
	 * @param email - email korisnika
	 * @returns UserDTO - DTO sa podacima o korisniku
	 */
	getUserByEmail(email: string): Promise<UserDTO>;

	/**
	 * updateUser - Azurira sve sem lozinke za nekog korisnika
   * @param user - Novi podaci o korisniku
   * @returns UserDTO - sa novim podacima ili prazan DTO ako operacija nije uspela
	 */
	updateUser(user: UserDTO): Promise<UserDTO>;
}