export class UserLoginDto {
   public constructor(
        public id: number = 0,
        public emai: string = '',
        public role: string = ''
    ) {}
}