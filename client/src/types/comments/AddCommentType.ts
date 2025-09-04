/**
 * **AddCommentType** 
 * 
 * Tip za pravljenje komentara.
 * Polja:
 *  - ```autorId``` - Id autora objave
 *  - ```vestId``` - Id vesti za koju je komentar
 *  - ```tekst``` - Tekst komentara
 *  - ```vreme``` - vreme kreiranja komentara
 */
export interface AddCommentType{
  autorId: number;
  vestId: number;
  tekst: string;
  vreme: Date;
}