import { CreateVestDTO } from "../../Domain/DTOs/vesti/CreateVestDTO";
import { Vest } from "../../Domain/models/Vest";
import { IVestRepository } from "../../Domain/repositories/vesti/IVestRepository";
import { IVestService } from "../../Domain/services/vesti/IVestService";

export class VestService implements IVestService {

  public constructor(private vestRepository: IVestRepository){}

  async createVest(vest: CreateVestDTO): Promise<Vest> {
    return this.vestRepository.create(vest);
  }

  getVestById(id: number): Promise<Vest> {
    return this.vestRepository.getById(id);
  }

  getSlicneVesti(id: number): Promise<Vest[]> {
    return this.vestRepository.getSlicneVesti(id);
  }

  getNewestNews(): Promise<Vest[]> {
    return this.vestRepository.getByTime();
  }

  getNajpolularnijeVesti(n: number): Promise<Vest[]> {
    return this.vestRepository.getByPopularity();
  }
	// Implementacija servisa
}