import { ResultSetHeader, RowDataPacket } from "mysql2";
import { CreateVestDTO } from "../../../Domain/DTOs/vesti/CreateVestDTO";
import { IVestRepository } from "../../../Domain/repositories/vesti/IVestRepository";

import db from "../../connection/DbConnectionPool";
import { VestDTO } from "../../../Domain/DTOs/vesti/VestDTO";

export class VestiRepository implements IVestRepository {
	async getSlicneVesti(id: number): Promise<VestDTO[]> {
		try {
			const query = `
        SELECT v1.id, v1.autor_id, u1.ime, u1.prezime, v1.naslov, v1.tekst, v1.slika, v1.vreme, v1.br_pregleda
        FROM vesti v1
        JOIN tags t1 ON v1.id = t1.id_vesti INNER
        JOIN tags t2 
            ON t1.naziv = t2.naziv
        JOIN users u1 ON v1.autor_id = u1.id
        WHERE t2.id_vesti = 3 AND t1.id_vesti != t2.id_vesti
        GROUP BY t1.id_vesti, t2.id_vesti
        HAVING COUNT(*) >= 2;
      `;

			const [rows] = await db.execute<RowDataPacket[]>(query, [id]);
			return rows.map(
				(row) =>
					new VestDTO(
						row.id,
						{
							id: row.autor_id,
							ime: row.ime,
							prezime: row.prezime,
						},
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

			const [result] = await db.execute<ResultSetHeader>(query, [
				vest.autorId,
				vest.naslov,
				vest.tekst,
				vest.slika,
				vest.vreme,
			]);

			return result.insertId;
		} catch {
			return 0;
		}
	}

	async getById(id: number): Promise<VestDTO> {
		try {
			const query = `
        SELECT v1.id, autor_id, ime, prezime, naslov, tekst, slika, vreme, br_pregleda
        FROM vesti v1
        JOIN users u1 ON v1.autor_id = u1.id
        WHERE v1.id = ?;
      `;

			const [rows] = await db.execute<RowDataPacket[]>(query, [id]);

			if (rows.length > 0) {
				const row = rows[0];
				return new VestDTO(
					row.id,
					{
						id: row.autor_id,
						ime: row.ime,
						prezime: row.prezime,
					},
					row.naslov,
					row.tekst,
					row.slika,
					row.vreme,
					row.br_pregleda
				);
			}

			return new VestDTO();
		} catch {
			return new VestDTO();
		}
	}

	async getByPopularity(start: number, end: number): Promise<VestDTO[]> {
		try {
			const query = `
        SELECT v1.id, autor_id, ime, prezime, naslov, tekst, slika, vreme, br_pregleda
        FROM vesti v1
        JOIN users u1 ON v1.autor_id = u1.id
        ORDER BY v1.br_pregleda DESC
        LIMIT ?, ?
      `;


			const [rows] = await db.execute<RowDataPacket[]>(query, [
				`${start}`,
				`${end - start}`,
			]);

			return rows.map(
				(row) =>
					new VestDTO(
						row.id,
						{
							id: row.autor_id,
							ime: row.ime,
							prezime: row.prezime,
						},
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

	async getByTime(start: number, end: number): Promise<VestDTO[]> {
		try {
			const query = `
        SELECT v1.id, autor_id, ime, prezime, naslov, tekst, slika, vreme, br_pregleda
        FROM vesti v1
        JOIN users u1 ON v1.autor_id = u1.id
        ORDER BY v1.vreme DESC
        LIMIT ? OFFSET ?;
      `;

			const [rows] = await db.execute<RowDataPacket[]>(query, [
				`${end - start}`,
        `${start}`,
			]);

			return rows.map(
				(row) =>
					new VestDTO(
						row.id,
						{
              id: row.autor_id,
              ime: row.ime,
              prezime: row.prezime,
            },
						row.naslov,
						row.tekst,
						row.slika,
						row.vreme,
						row.br_pregleda
					)
			);
		} catch (err) {
      console.log(err)
			return [];
		}
	}

	async update(vest: VestDTO): Promise<VestDTO> {
		try {
			const query = `
        UPDATE vesti
        SET autor_id = ?, naslov = ?, tekst = ?, slika = ?, vreme = ?, br_pregleda = ?
        WHERE id = ?
      `;

			const [result] = await db.execute<ResultSetHeader>(query, [
				vest.autor.id,
				vest.naslov,
				vest.tekst,
				vest.slika,
				vest.vreme,
				vest.brPregleda,
				vest.id,
			]);

			if (result.affectedRows > 0) {
				return vest;
			}

			return new VestDTO();
		} catch {
			return new VestDTO();
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