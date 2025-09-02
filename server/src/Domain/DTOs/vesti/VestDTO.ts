export class VestDTO {
	public constructor(
		public id: number = 0,
		public autor: {
			id: number;
			ime: string;
			prezime: string;
		} = { id: 0, ime: "", prezime: "" },
		public naslov: string = "",
		public tekst: string = "",
		public slika: string = "",
		public vreme: Date = new Date(),
		public brPregleda: number = 0
	) {}
}