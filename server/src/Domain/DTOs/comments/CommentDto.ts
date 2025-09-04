import { UserDTO } from "../users/UserDTO";

export class CommentDto {
	public constructor(
    public id: number = 0,
		public autor: UserDTO = new UserDTO(),
		public vestId: number = 0,
		public tekst: string = "",
		public vreme: Date = new Date()
	) {}
}
