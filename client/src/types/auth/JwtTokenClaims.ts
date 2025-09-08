export type JwtTokenClaims = {
    id: number;
    korisnickoIme: string;
    uloga: string;
    exp?: number; // opciono, za proveru isteka tokena
}