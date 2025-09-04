import { UserDTO } from "../../Domain/DTOs/users/UserDTO";
import { User } from "../../Domain/models/User";
import { IUserRepository } from "../../Domain/repositories/users/IUserRepository";
import { IUserService } from "../../Domain/services/users/IUserService";

export class UserService implements IUserService {

  public constructor(private userRepository: IUserRepository) {}

  async updateUser(user: UserDTO): Promise<UserDTO> {
    var currentUser = await this.userRepository.getById(user.id);

    if(currentUser.id == 0)
      return new UserDTO();

    var updated = await this.userRepository.update(new User(
      user.id,
      user.ime,
      user.prezime,
      user.prezime,
      user.mejl,
      currentUser.lozinka
    ));

    if(updated.id == 0)
      return new UserDTO();

    return user;
  }

  async getUserById(id: number): Promise<UserDTO> {
    var user = await this.userRepository.getById(id);

    return new UserDTO(user.id, user.uloga, user.ime, user.prezime, user.mejl);
  }

  async getUserByEmail(email: string): Promise<UserDTO> {
    var user = await this.userRepository.getByEmail(email);

		return new UserDTO(user.id, user.uloga, user.ime, user.prezime, user.mejl);
  }
    
}