import { ResultSetHeader, RowDataPacket } from "mysql2";
import { CreateVestDTO } from "../../../Domain/DTOs/vesti/CreateVestDTO";
import { IVestRepository } from "../../../Domain/repositories/vesti/IVestRepository";

import db from "../../connection/DbConnectionPool";
import { Vest } from "../../../Domain/models/Vest";
import { dateFormatter } from "../../../Helpers/DateFormatter";

export class VestiRepository implements IVestRepository {
	async getSlicneVesti(id: number): Promise<Vest[]> {
		try {
			const query = `
        SELECT v1.id, v1.autor_id, v1.naslov, v1.tekst, v1.slika, v1.vreme, v1.br_pregleda
        FROM vesti v1
        JOIN tags t1 ON v1.id = t1.id_vesti INNER
        JOIN tags t2 
            ON t1.naziv = t2.naziv
        WHERE t2.id_vesti = ? AND t1.id_vesti != t2.id_vesti
        GROUP BY t1.id_vesti, t2.id_vesti
        HAVING COUNT(*) >= 2;
      `;

			const [rows] = await db.execute<RowDataPacket[]>(query, [id]);
			return rows.map(
				(row) =>
					new Vest(
						row.id,
						row.autor_id,
						row.naslov,
						row.tekst,
						row.slika,
						row.vreme,
						row.br_pregleda
					)
			);
		} catch {
			return [];
		}
	}

	async create(vest: CreateVestDTO): Promise<number> {
		try {
			const query = `
        INSERT INTO vesti (autor_id, naslov, tekst, slika, vreme) 
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      const foramtedDate = dateFormatter(`${vest.vreme}`);

			const [result] = await db.execute<ResultSetHeader>(query, [
				vest.autorId,
				vest.naslov,
				vest.tekst,
				vest.slika,
				foramtedDate,
			]);

			return result.insertId;
		} catch {
			return 0;
		}
	}

	async getById(id: number): Promise<Vest> {
		try {
			const query = `
        SELECT id, autor_id, naslov, tekst, slika, vreme, br_pregleda
        FROM vesti 
        WHERE id = ?;
      `;

			const [rows] = await db.execute<RowDataPacket[]>(query, [id]);

			if (rows.length > 0) {
				const row = rows[0];
				return new Vest(
					row.id,
					row.autor_id,
					row.naslov,
					row.tekst,
					row.slika,
					row.vreme,
					row.br_pregleda
				);
			}

			return new Vest();
		} catch {
			return new Vest();
		}
	}

  async getAll(): Promise<Vest[]> {
    try {
      const query = `
        SELECT id, autor_id, naslov, tekst, slika, vreme, br_pregleda
        FROM vesti;
      `;

      const [rows] = await db.execute<RowDataPacket[]>(query);
      return rows.map(
        (row) =>
          new Vest(
            row.id,
            row.autor_id,
            row.naslov,
            row.tekst,
            row.slika,
            row.vreme,
            row.br_pregleda
          )
      );
    } catch {
      return [];
    } 
  }

	async update(vest: Vest): Promise<Vest> {
		try {
			const query = `
        UPDATE vesti
        SET autor_id = ?, naslov = ?, tekst = ?, slika = ?, vreme = ?, br_pregleda = ?
        WHERE id = ?
      `;

      const foramtedDate = dateFormatter(`${vest.vreme}`);

			const [result] = await db.execute<ResultSetHeader>(query, [
				vest.autorId,
				vest.naslov,
				vest.tekst,
				vest.slika,
				foramtedDate,
				vest.br_pregleda,
				vest.id,
			]);

			if (result.affectedRows > 0) {
				return vest;
			}

			return new Vest();
		} catch {
			return new Vest();
		}
	}

	async delete(id: number): Promise<boolean> {
		try {
			const query = `
        DELETE FROM vesti
        WHERE id = ?
      `;

			const [result] = await db.execute<ResultSetHeader>(query, [id]);

			return result.affectedRows > 0;
		} catch {
			return false;
		}
	}
}