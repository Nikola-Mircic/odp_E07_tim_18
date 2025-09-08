export type UserProfileDto = {
	id: number;
	uloga: string;
	ime: string;
	prezime: string;
	mejl?: string; // DB kolona "mejl"
	email?: string; // alternativno ime, ako backend vraća "email"
};
