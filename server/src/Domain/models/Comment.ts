export class Comment {
	public constructor(
		public id: number = 0,
		public autorId: number = 0,
		public vestId: number = 0,
		public tekst: string = "",
		public vreme: Date = new Date()
	) {}
}
