export class CreateVestDTO {
	public constructor(
		public autorId: number = 0,
		public naslov: string = "",
		public tekst: string = "",
		public slika: string = "",
		public vreme: Date = new Date()
	) {}
}