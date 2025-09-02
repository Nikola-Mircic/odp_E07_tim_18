export class UserDTO {
	public constructor(
		public id: number = 0,
		public uloga: string = "",
		public ime: string = "",
		public prezime: string = "",
		public mejl: string = "",
	) {}
}
