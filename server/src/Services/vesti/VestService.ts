import { CreateVestDTO } from "../../Domain/DTOs/vesti/CreateVestDTO";
import { VestDTO } from "../../Domain/DTOs/vesti/VestDTO";
import { IUserRepository } from "../../Domain/repositories/users/IUserRepository";
import { IVestRepository } from "../../Domain/repositories/vesti/IVestRepository";
import { IVestService } from "../../Domain/services/vesti/IVestService";

export class VestService implements IVestService {
	public constructor(private vestRepository: IVestRepository, private userRepository: IUserRepository) {}

	async createVest(vest: CreateVestDTO): Promise<number> {
    let user = await this.userRepository.getById(vest.autorId);

    if(user.id == 0)
      return 0;

		return this.vestRepository.create(vest);
	}

	async getVestById(id: number): Promise<VestDTO> {
		let vest = await this.vestRepository.getById(id);

    vest.brPregleda++;

    this.vestRepository.update(vest);

    return vest;
	}

	getSlicneVesti(id: number): Promise<VestDTO[]> {
		return this.vestRepository.getSlicneVesti(id);
	}

	getNewestNews(start: number, end: number): Promise<VestDTO[]> {
		return this.vestRepository.getByTime(start, end);
	}

	getNajpolularnijeVesti(start: number, end: number): Promise<VestDTO[]> {
		return this.vestRepository.getByPopularity(start, end);
	}
	// Implementacija servisa
}