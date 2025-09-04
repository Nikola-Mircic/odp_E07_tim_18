import type { UserDto } from "../users/UserDTO";

export interface CommentDto{
  id: number;
  autor: UserDto;
  vestId: number;
  tekst: string;
  vreme: Date;
}