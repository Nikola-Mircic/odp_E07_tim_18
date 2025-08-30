export class CreateUserDTO {
	public constructor(
		public editor: boolean = false,
		public ime: string = "",
		public prezime: string = "",
		public mejl: string = "",
		public lozinka: string = ""
	) {}
}
