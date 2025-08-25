import { IUserRepository } from "../../../Domain/repositories/users/IUserRepository";
import { User } from "../../../Domain/models/User";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import db from "../../connection/DbConnectionPool";
import { CreateUserDTO } from "../../../Domain/DTOs/users/CreateUserDTO";

export class UserRepository implements IUserRepository {
  async create(user: CreateUserDTO): Promise<User> {
    try {
      const query = `
        INSERT INTO users (editor, ime, prezime, mejl, lozinka) 
        VALUES (?, ?, ?, ?, ?)
      `;

      const [result] = await db.execute<ResultSetHeader>(query, [
        user.editor,
        user.ime,
        user.prezime,
        user.mejl,
        user.lozinka,
      ]);


      if (result.insertId) {
        // Vraćamo novog korisnika sa dodeljenim ID-om
        return new User(
					result.insertId,
					user.editor,
					user.ime,
					user.prezime,
					user.mejl,
					user.lozinka
				);
      }

      // Vraćamo prazan objekat ako kreiranje nije uspešno
      return new User();
    } catch {
      return new User();
    }
  }

  async getById(id: number): Promise<User> {
    try {
      const query = `
        SELECT id, editor, ime, prezime, mejl, lozinka 
        FROM users
        WHERE id = ?
      `;

      const [rows] = await db.execute<RowDataPacket[]>(query, [id]);

      if (rows.length > 0) {
        const row = rows[0];
        return new User(
          row.id,
          row.editor,
          row.ime,
          row.prezime,
          row.mejl, 
          row.lozinka
        );
      }

      return new User();
    } catch {
      return new User();
    }
  }

  async getByUsername(korisnickoIme: string): Promise<User> {
    try {
      const query = `
        SELECT id, editor, ime, prezime, mejl, lozinka 
        FROM user
        WHERE korisnickoIme = ?
      `;

      const [rows] = await db.execute<RowDataPacket[]>(query, [korisnickoIme]);

      if (rows.length > 0) {
        const row = rows[0];
        return new User(
					row.id,
					row.editor,
					row.ime,
					row.prezime,
					row.mejl,
					row.lozinka
				);
      }

      return new User();
    } catch {
      return new User();
    }
  }

  async getAll(): Promise<User[]> {
    try {
      const query = `
        SELECT id, editor, ime, prezime, mejl, lozinka 
        FROM users
        ORDER BY id ASC
      `;

      const [rows] = await db.execute<RowDataPacket[]>(query);

      return rows.map(
        (row) => new User(
          row.id,
          row.editor,
          row.ime,
          row.prezime,
          row.mejl, 
          row.lozinka
        )
      );
    } catch {
      return [];
    }
  }

  async update(user: User): Promise<User> {
    try {
      const query = `
        UPDATE users
        SET editor = ?, ime = ?, prezime = ?, mejl = ?, lozinka = ? 
        WHERE id = ?
      `;

      const [result] = await db.execute<ResultSetHeader>(query, [
        user.editor,
        user.ime,
        user.prezime,
        user.mejl,
        user.lozinka,
        user.id,
      ]);

      if (result.affectedRows > 0) {
        return user;
      }

      return new User();
    } catch {
      return new User();
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const query = `
        DELETE FROM users
        WHERE id = ?
      `;

      const [result] = await db.execute<ResultSetHeader>(query, [id]);

      return result.affectedRows > 0;
    } catch {
      return false;
    }
  }

  async exists(id: number): Promise<boolean> {
    try {
      const query = `
        SELECT COUNT(*) as count 
        FROM users 
        WHERE id = ?
      `;

      const [rows] = await db.execute<RowDataPacket[]>(query, [id]);

      return rows[0].count > 0;
    } catch {
      return false;
    }
  }
}