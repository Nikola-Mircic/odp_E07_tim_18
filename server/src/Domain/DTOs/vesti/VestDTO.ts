import { UserDTO } from "../users/UserDTO";

export class VestDTO {
	public constructor(
		public id: number = 0,
		public autor: UserDTO = new UserDTO(),
    public tags: string[] = [],
		public naslov: string = "",
		public tekst: string = "",
		public slika: string = "",
		public vreme: Date = new Date(),
		public brPregleda: number = 0
	) {}
}