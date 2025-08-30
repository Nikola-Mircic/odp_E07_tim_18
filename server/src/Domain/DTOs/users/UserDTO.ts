export class UserDTO {
	public constructor(
		public id: number = 0,
		public editor: boolean = false,
		public ime: string = "",
		public prezime: string = "",
		public mejl: string = "",
	) {}
}
