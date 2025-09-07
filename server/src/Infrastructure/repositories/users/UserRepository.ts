import { pool } from "../../../db_upiti";
import { User } from "../../../Domain/models/User";
import type { IUserRepository } from "../../../Domain/repositories/users/IUserRepository";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

/**
 * Tabela `users`: id, uloga, ime, prezime, mejl, lozinka
 */
export class UserRepository implements IUserRepository {
  // === READ ===
  async getById(id: number): Promise<User> {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT id, uloga, ime, prezime, mejl, lozinka FROM users WHERE id = ? LIMIT 1",
      [id]
    );
    const r = (rows as any[])[0];
    if (!r) return new User(0, "", "", "", "", "");
    return new User(r.id, r.uloga, r.ime, r.prezime, r.mejl, r.lozinka);
  }

  async getByEmail(mejl: string): Promise<User> {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT id, uloga, ime, prezime, mejl, lozinka FROM users WHERE mejl = ? LIMIT 1",
      [mejl]
    );
    const r = (rows as any[])[0];
    if (!r) return new User(0, "", "", "", "", "");
    return new User(r.id, r.uloga, r.ime, r.prezime, r.mejl, r.lozinka);
  }

  // ako interfejs traži "getByUsername" – koristimo mejl kao username
  async getByUsername(username: string): Promise<User> {
    return this.getByEmail(username);
  }

  async getAll(): Promise<User[]> {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT id, uloga, ime, prezime, mejl, lozinka FROM users"
    );
    return (rows as any[]).map(
      (r) => new User(r.id, r.uloga, r.ime, r.prezime, r.mejl, r.lozinka)
    );
  }

  // === CREATE ===
  async create(user: User): Promise<User> {
    const [res] = await pool.execute<ResultSetHeader>(
      "INSERT INTO users (uloga, ime, prezime, mejl, lozinka) VALUES (?, ?, ?, ?, ?)",
      [user.uloga, user.ime, user.prezime, user.mejl, user.lozinka]
    );
    const id = (res as ResultSetHeader).insertId;
    return new User(id, user.uloga, user.ime, user.prezime, user.mejl, user.lozinka);
  }

  // === UPDATE ===
  async update(user: User): Promise<User> {
    await pool.execute(
      "UPDATE users SET uloga = ?, ime = ?, prezime = ?, mejl = ?, lozinka = ? WHERE id = ?",
      [user.uloga, user.ime, user.prezime, user.mejl, user.lozinka, user.id]
    );
    return this.getById(user.id);
  }

  // === DELETE ===  (vraća Promise<boolean>)
  async delete(id: number): Promise<boolean> {
    const [res] = await pool.execute<ResultSetHeader>(
      "DELETE FROM users WHERE id = ?",
      [id]
    );
    return (res as ResultSetHeader).affectedRows > 0;
  }

  // === EXISTS ===
  // Overload potpis da pokrijemo i varijantu sa mejlom i sa id-jem.
  async exists(mejl: string): Promise<boolean>;
  async exists(id: number): Promise<boolean>;
  async exists(arg: string | number): Promise<boolean> {
    if (typeof arg === "number") {
      const [rows] = await pool.query<RowDataPacket[]>(
        "SELECT 1 FROM users WHERE id = ? LIMIT 1",
        [arg]
      );
      return (rows as any[]).length > 0;
    } else {
      const [rows] = await pool.query<RowDataPacket[]>(
        "SELECT 1 FROM users WHERE mejl = ? LIMIT 1",
        [arg]
      );
      return (rows as any[]).length > 0;
    }
  }

  // (opciono) helper – ako ti neko koristi baš ovo ime
  async existsByEmail(mejl: string): Promise<boolean> {
    return this.exists(mejl);
  }
}
