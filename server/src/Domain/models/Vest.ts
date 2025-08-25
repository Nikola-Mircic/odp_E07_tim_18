export class Vest {
	public constructor(
		public id: number = 0,
		public autorId: number = 0,
		public naslov: string = "",
		public tekst: string = "",
    public slika: string = "",
		public vreme: Date = new Date(),
    public br_pregleda: number = 0
	) {}
}