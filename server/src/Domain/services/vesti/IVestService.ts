import { CreateVestDTO } from "../../DTOs/vesti/CreateVestDTO";
import { VestDTO } from "../../DTOs/vesti/VestDTO";

export interface IVestService {
	/**
	 * Pravljenje nove vesti
	 * @param vest - DTO za kreiranje vesti
	 * @returns ID kreirane vesti ili 0 ako kreiranje nije uspelo
	 */
	createVest(vest: CreateVestDTO): Promise<number>;

	/**
	 * Pronalazenje vesti po ID-u
	 * @param id - ID vesti
	 * @returns VestDTO - objekat vesti ili prazan (default) objekat ako vest nije pronađena
	 */
	getVestById(id: number): Promise<VestDTO>;

	/**
	 * Pronalazenje svih vesti slicnih vesti sa datim ID
	 * @returns Niz svih vesti ili prazan niz ako nema vesti
	 */
	getSlicneVesti(id: number): Promise<VestDTO[]>;

	getVesti(): Promise<VestDTO[]>;
}