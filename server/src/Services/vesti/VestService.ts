import { CommentDto } from "../../Domain/DTOs/comments/CommentDto";
import { CreateVestDTO } from "../../Domain/DTOs/vesti/CreateVestDTO";
import { VestDTO } from "../../Domain/DTOs/vesti/VestDTO";
import { Vest } from "../../Domain/models/Vest";
import { ITagRepository } from "../../Domain/repositories/tags/ITagRepository";
import { IUserRepository } from "../../Domain/repositories/users/IUserRepository";
import { IVestRepository } from "../../Domain/repositories/vesti/IVestRepository";
import { ITagService } from "../../Domain/services/tags/ITagService";
import { IUserService } from "../../Domain/services/users/IUserService";
import { IVestService } from "../../Domain/services/vesti/IVestService";

export class VestService implements IVestService {
	public constructor(
    private vestRepository: IVestRepository, 
    private userSerivce: IUserService,
    private tagService: ITagService
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
    let tags = await this.tagService.getForVest(vest.id);

    return new VestDTO(
      vest.id,
      autor,
      tags.map(t => t.naziv),
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
      let autor = await this.userSerivce.getUserById(vest.autorId);
      let tags = await this.tagService.getForVest(vest.id);

      result.push(new VestDTO(
        vest.id, 
        autor,
        tags.map(t => t.naziv),
        vest.naslov,
        vest.tekst,
        vest.slika,
        vest.vreme,
        vest.br_pregleda
      ));
    }

    return result;
	}

	async getVesti(): Promise<VestDTO[]> {
    var vesti = await this.vestRepository.getAll();

    var result: VestDTO[] = [];

		for (let vest of vesti) {
			let autor = await this.userSerivce.getUserById(vest.autorId);

      let tags = await this.tagService.getForVest(vest.id);

			result.push(
				new VestDTO(
					vest.id,
					autor,
          tags.map(t => t.naziv),
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