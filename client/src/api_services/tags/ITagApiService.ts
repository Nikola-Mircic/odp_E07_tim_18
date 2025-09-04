import type { Tag } from "../../models/tags/Tag";
import type { ApiResponse } from "../../types/common/ApiResponse";

export interface ITagApiService {
  tagsForVest(id_vesti: number): Promise<ApiResponse<Tag[]>>;
  addTag(id_vesti: number, naziv: string): Promise<ApiResponse<boolean>>;
  removeTag(id_vesti: number, naziv: string): Promise<ApiResponse<boolean>>;
}