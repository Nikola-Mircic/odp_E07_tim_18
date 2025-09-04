export class AddCommentDto {
	public constructor(
    public autorId: number = 0,
    public vestId: number = 0,
		public tekst: string = "",
    public vreme: Date = new Date()
	) {}
}