import { CreateVestDTO } from "../../DTOs/vesti/CreateVestDTO";
import { Vest } from "../../models/Vest";

export interface IVestService {
  /**
   * Pravljenje nove vesti
   * @param vest - DTO za kreiranje vesti
   * @returns ID kreirane vesti ili 0 ako kreiranje nije uspelo
   */
  createVest(vest: CreateVestDTO): Promise<Vest>;

  /**
   * Pronalazenje vesti po ID-u
   * @param id - ID vesti
   * @returns Vest - objekat vesti ili prazan (default) objekat ako vest nije pronađena
   */
  getVestById(id: number): Promise<Vest>;

  /**
   * Pronalazenje svih vesti slicnih vesti sa datim ID
   * @returns Niz svih vesti ili prazan niz ako nema vesti
   */
  getSlicneVesti(id: number): Promise<Vest[]>;

  /**
   * Pronalazenje najnovijih vesti
   * @returns Niz najnovijih vesti ili prazan niz ako nema vesti
   */
  getNewestNews(): Promise<Vest[]>;

  /**
   * Pronalazenje najpopularnijih vesti
   * @param n - broj najpopularnijih vesti koje treba vratiti
   * @returns Niz najpopularnijih vesti ili prazan niz ako nema vesti
   */
  getNajpolularnijeVesti(): Promise<Vest[]>;
}