import { Tag } from "../../Domain/models/Tag";
import { ITagRepository } from "../../Domain/repositories/tags/ITagRepository";
import { ITagService } from "../../Domain/services/tags/ITagService";
import { IVestService } from "../../Domain/services/vesti/IVestService";

export class TagService implements ITagService{
  public constructor(
    private tagRepository: ITagRepository,
    private vestService: IVestService
  ){}

  getForVest(id_vesti: number): Promise<Tag[]> {
    return this.tagRepository.getAllFor(id_vesti);
  }

  async addTag(id_vesti: number, tag: string): Promise<boolean> {
    let vest = await this.vestService.getVestById(id_vesti);
    if(vest.id == 0)
      return false;

    return this.tagRepository.addTag(id_vesti, tag);
  }
  
  removeTag(id_vesti: number, tag: string): Promise<boolean> {
    return this.tagRepository.removeTag(id_vesti, tag);
  }

}