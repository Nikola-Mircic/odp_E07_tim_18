import { Tag } from "../../models/Tag";

export interface ITagRepository {
  // Definišite metode za rad sa tagovima
  getAllFor(id_vesti: number): Promise<Tag[]>;
  addTag(id_vesti: number, tag: string): Promise<boolean>;
  removeTag(id_vesti: number, tag: string): Promise<boolean>;
}