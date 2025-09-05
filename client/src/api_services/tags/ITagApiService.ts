import type { Tag } from "../../models/tags/Tag";
import type { ApiResponse } from "../../types/common/ApiResponse";

export interface ITagApiService {
  tagsForVest(id_vesti: number): Promise<ApiResponse<Tag[]>>;
  addTag(token: string, id_vesti: number, naziv: string): Promise<ApiResponse<boolean>>;
  removeTag(token: string, id_vesti: number, naziv: string): Promise<ApiResponse<boolean>>;
}