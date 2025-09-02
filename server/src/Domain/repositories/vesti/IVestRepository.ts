import { CreateVestDTO } from "../../DTOs/vesti/CreateVestDTO";
import { VestDTO } from "../../DTOs/vesti/VestDTO";

export interface IVestRepository {
	/**
	 * Sacuva vest u bazi i vrati njen ID
	 * @param vest - vest koja se cuva
	 * @returns ID sacuvane vesti
	 */
	create(vest: CreateVestDTO): Promise<number>;

	/**
	 * Vrati vest na osnovu ID-ja
	 * @param id - ID vesti
	 * @returns VestDTO sa zadatim ID-jem
	 */
	getById(id: number): Promise<VestDTO>;

	/**
	 * Vrati najpopularnije vesti u opsegu
	 * @param start - pocetak opsega
	 * @param end - kraj opsega
	 * @returns Niz najpopularnijih vesti u opsegu [start, end)
	 */
	getByPopularity(start: number, end: number): Promise<VestDTO[]>;

	/**
	 * Vrati najnovije vesti u opsegu
	 * @param start - pocetak opsega
	 * @param end - kraj opsega
	 * @returns Niz najnovijih vesti u opsegu [start, end)
	 * */
	getByTime(start: number, end: number): Promise<VestDTO[]>;

	/**
	 * Azurira vest u bazi
	 * @param vest - vest koja se azurira
	 * @returns Azurirana vest
	 */
	update(vest: VestDTO): Promise<VestDTO>;

	/**
	 * Brise vest iz baze
	 * @param id - ID vesti koja se brise
	 * @returns True ako je brisanje uspesno, inace false
	 */
	delete(id: number): Promise<boolean>;

	/**
	 * Vrati slicne vesti na osnovu ID-ja vesti
	 * @param id - ID vesti
	 * @returns Niz slicnih vesti
	 */
	getSlicneVesti(id: number): Promise<VestDTO[]>;
}