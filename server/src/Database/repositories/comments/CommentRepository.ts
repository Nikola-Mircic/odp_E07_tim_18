import { ResultSetHeader, RowDataPacket } from "mysql2";
import { AddCommentDto } from "../../../Domain/DTOs/comments/AddCommnetDto";
import { Comment } from "../../../Domain/models/Comment";
import { ICommentRepository } from "../../../Domain/repositories/comment/ICommentRepository";
import db from "../../connection/DbConnectionPool";
import { dateFormatter } from "../../../Helpers/DateFormatter";

export class CommentRepository implements ICommentRepository {

  async updateComment(comment: Comment): Promise<Comment> {
    try{
      const query = `
        UPDATE comments
        SET autor_id = ?, vest_id = ?, tekst = ?, vreme = ?
        WHERE id = ?
      `;

      const foramtedDate = dateFormatter(`${comment.vreme}`);

      const [result] = await db.execute<ResultSetHeader>(query, [
				comment.autorId,
				comment.vestId,
				comment.tekst,
				foramtedDate,
				comment.id,
			]);

      if (result.affectedRows > 0) {
				return comment;
			}
      return new Comment();
    }catch{
      return new Comment();
    }
  }

  async deleteComment(id: number): Promise<boolean> {
    try{
      const query = `
        DELETE FROM comments
        WHERE id = ?
      `;

      const [result] = await db.execute<ResultSetHeader>(query, [id]);

      return result.affectedRows > 0;
    }catch{
      return false;
    }
  }

  async getCommentById(id: number): Promise<Comment> {
    try {
			var query = `
        SELECT * FROM comments where id = ?;
      `;

			const [result] = await db.execute<RowDataPacket[]>(query, [id]);
      
      if (result.length == 0) return new Comment();
      
      let row = result[0];

			return new Comment(
				row.id,
				row.autor_id,
				row.vest_id,
				row.tekst,
				row.vreme
			);
		} catch {
			return new Comment();
		}
	}

  async getCommentsForVest(postId: number): Promise<number[]> {
    try{
      var query = `
        SELECT c1.id
        FROM comments c1
        JOIN vesti v1 ON c1.vest_id = v1.id
        WHERE v1.id = ?; 
      `;

      const [result] = await db.execute<RowDataPacket[]>(query, [postId]);

      return result.map(
				(row) => row.id
			);
      
    }catch{
      return [];
    }
  }
  async createComment(comment: AddCommentDto): Promise<Comment> {
    try {
			const query = `
        INSERT INTO comments ( autor_id, vest_id, tekst, vreme )
        VALUES (?, ?, ?, ?)
      `;

      const foramtedDate = dateFormatter(`${comment.vreme}`);

			const [result] = await db.execute<ResultSetHeader>(query, [
				comment.autorId,
				comment.vestId,
				comment.tekst,
				foramtedDate,
			]); 

      console.log("Inserting...");
      console.log(result);

			if(result.affectedRows > 0){
        return new Comment(
          result.insertId,
          comment.autorId,
          comment.vestId,
          comment.tekst,
          comment.vreme
        );
      }

      return new Comment();
		} catch (error) {
      console.log(error);
			return new Comment();
		}
  }

}