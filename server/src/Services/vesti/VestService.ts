import { CommentDto } from "../../Domain/DTOs/comments/CommentDto";
import { CreateVestDTO } from "../../Domain/DTOs/vesti/CreateVestDTO";
import { VestDTO } from "../../Domain/DTOs/vesti/VestDTO";
import { Vest } from "../../Domain/models/Vest";
import { IUserRepository } from "../../Domain/repositories/users/IUserRepository";
import { IVestRepository } from "../../Domain/repositories/vesti/IVestRepository";
import { IUserService } from "../../Domain/services/users/IUserService";
import { IVestService } from "../../Domain/services/vesti/IVestService";

export class VestService implements IVestService {
	public constructor(
    private vestRepository: IVestRepository, 
    private userSerivce: IUserService
  ) {}

	async createVest(vest: CreateVestDTO): Promise<number> {
    let user = await this.userSerivce.getUserById(vest.autorId);

    if(user.id == 0)
      return 0;

		return this.vestRepository.create(vest);
	}

	async getVestById(id: number): Promise<VestDTO> {
		let vest = await this.vestRepository.getById(id);

    vest.br_pregleda++;
    this.vestRepository.update(vest);

    let autor = await this.userSerivce.getUserById(vest.autorId);

    return new VestDTO(
      vest.id,
      autor,
      vest.naslov,
      vest.tekst,
      vest.slika,
      vest.vreme,
      vest.br_pregleda
    );
	}

	async getSlicneVesti(id: number): Promise<VestDTO[]> {
		var slicneVesti = await this.vestRepository.getSlicneVesti(id);

    var result: VestDTO[] = [];

    for(let vest of slicneVesti){
      console.log(vest);
      let autor = await this.userSerivce.getUserById(vest.autorId);

      result.push(new VestDTO(
        vest.id, 
        autor,
        vest.naslov,
        vest.tekst,
        vest.slika,
        vest.vreme,
        vest.br_pregleda
      ));
    }

    return result;
	}

	async getNewestNews(start: number, end: number): Promise<VestDTO[]> {
    var vesti = await this.vestRepository.getByTime(start, end);

    var result: VestDTO[] = [];

		for (let vest of vesti) {
			let autor = await this.userSerivce.getUserById(vest.autorId);

			result.push(
				new VestDTO(
					vest.id,
					autor,
					vest.naslov,
					vest.tekst,
					vest.slika,
					vest.vreme,
					vest.br_pregleda
				)
			);
		}

		return result;
	}

	async getNajpolularnijeVesti(start: number, end: number): Promise<VestDTO[]> {
		var vesti = await this.vestRepository.getByPopularity(start, end);

		var result: VestDTO[] = [];

		for (let vest of vesti) {
			let autor = await this.userSerivce.getUserById(vest.autorId);

			result.push(
				new VestDTO(
					vest.id,
					autor,
					vest.naslov,
					vest.tekst,
					vest.slika,
					vest.vreme,
					vest.br_pregleda
				)
			);
		}

		return result;
	}
	// Implementacija servisa
}