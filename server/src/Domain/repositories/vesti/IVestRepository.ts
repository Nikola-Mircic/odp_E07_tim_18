import { CreateVestDTO } from "../../DTOs/vesti/CreateVestDTO";
import { Vest } from "../../models/Vest";

export interface IVestRepository {
  create(vest: CreateVestDTO): Promise<Vest>;
  getById(id: number): Promise<Vest>;
  getByPopularity(): Promise<Vest[]>;
  getByTime(): Promise<Vest[]>;
  update(vest: Vest): Promise<Vest>;
  delete(id: number): Promise<boolean>;
  getSlicneVesti(id: number): Promise<Vest[]>;
}