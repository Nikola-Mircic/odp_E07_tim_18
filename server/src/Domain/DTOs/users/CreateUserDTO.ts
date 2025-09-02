export class CreateUserDTO {
	public constructor(
		public uloga: string = '',
		public ime: string = "",
		public prezime: string = "",
		public mejl: string = "",
		public lozinka: string = ""
	) {}
}
