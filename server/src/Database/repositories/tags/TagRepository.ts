import { ResultSetHeader, RowDataPacket } from "mysql2";
import { ITagRepository } from "../../../Domain/repositories/tags/ITagRepository";
import db from "../../connection/DbConnectionPool";
import { Tag } from "../../../Domain/models/Tag";

export class TagRepository implements ITagRepository {
  async getAllFor(id_vesti: number): Promise<Tag[]> {
    try {
      const query = `
        SELECT naziv
        FROM tags
        WHERE id_vesti = ?
      `;

      const [rows] = await db.execute<RowDataPacket[]>(query, [id_vesti]);

      return rows.map(row => new Tag(id_vesti, row.naziv));
    } catch {
      return [];
    }
  }

  async addTag(id_vesti: number, tag: string): Promise<boolean> {
    try {
      const query = `
        INSERT INTO tags (id_vesti, naziv)
        VALUES (?, ?)
      `;

      await db.execute<ResultSetHeader>(query, [id_vesti, tag]);
      return true;
    } catch {
      return false;
    }
  }

  async removeTag(id_vesti: number, tag: string): Promise<boolean> {
    try {
      const query = `
        DELETE FROM tags
        WHERE id_vesti = ? AND naziv = ?
      `;

      const [result] = await db.execute<ResultSetHeader>(query, [id_vesti, tag]);
      return result.affectedRows > 0;
    } catch {
      return false;
    }
  }
}