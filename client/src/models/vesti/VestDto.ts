export interface VestDto {
	id: number;
	autor: {
		id: number;
		ime: string;
		prezime: string;
	};
	naslov: string;
	tekst: string;
	slika: string;
	vreme: Date;
	brPregleda: number;
}