import type { UserDto } from "../users/UserDTO";

export interface VestDto {
	id: number;
	autor: UserDto;
	naslov: string;
	tekst: string;
	slika: string;
	vreme: Date;
	brPregleda: number;
  tags: string[];
}