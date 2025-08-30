import { UserDTO } from "../../Domain/DTOs/users/UserDTO";
import { User } from "../../Domain/models/User";
import { IUserRepository } from "../../Domain/repositories/users/IUserRepository";
import { IUserService } from "../../Domain/services/users/IUserService";

export class UserService implements IUserService {

  public constructor(private userRepository: IUserRepository) {}

  async getUserById(id: number): Promise<UserDTO> {
    var user = await this.userRepository.getById(id);

    return new UserDTO(user.id, user.editor, user.ime, user.prezime, user.mejl);
  }

  async getUserByEmail(email: string): Promise<UserDTO> {
    var user = await this.userRepository.getByEmail(email);

		return new UserDTO(user.id, user.editor, user.ime, user.prezime, user.mejl);
  }
    
}