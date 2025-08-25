import { ResultSetHeader, RowDataPacket } from "mysql2";
import { CreateVestDTO } from "../../../Domain/DTOs/vesti/CreateVestDTO";
import { Vest } from "../../../Domain/models/Vest";
import { IVestRepository } from "../../../Domain/repositories/vesti/IVestRepository";

import db from "../../connection/DbConnectionPool";

export class VestiRepository implements IVestRepository {
	async create(vest: CreateVestDTO): Promise<Vest> {
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

			if (result.insertId) {
				// Vraćamo novu vest sa dodeljenim ID-om
				return new Vest(
					result.insertId,
					vest.autorId,
					vest.naslov,
					vest.tekst,
					vest.slika,
					vest.vreme
				);
			}

			// Vraćamo prazan objekat ako kreiranje nije uspešno
			return new Vest();
		} catch {
			return new Vest();
		}
	}

	async getById(id: number): Promise<Vest> {
		try{
      const query = `
        SELECT id, autor_id, naslov, tekst, slika, vreme, br_pregleda
        FROM vesti
        WHERE id = ?
      `;

      const [rows] = await db.execute<RowDataPacket[]>(query, [id]);

      if (rows.length > 0) {
        const row = rows[0];
        return new Vest(
          row.id,
          row.autorId,
          row.naslov,
          row.tekst,
          row.slika,
          row.vreme,
          row.br_pregleda
        );
      }

      return new Vest();
    }catch{
      return new Vest();
    }
	}

	async getByPopularity(): Promise<Vest[]> {
		try{
      const query = `
        SELECT id, autor_id, naslov, tekst, slika, vreme, br_pregleda
        FROM vesti
        ORDER BY br_pregleda DESC
      `;

      const [rows] = await db.execute<RowDataPacket[]>(query);

      return rows.map(
        (row) => new Vest(
          row.id,
          row.autorId,
          row.naslov,
          row.tekst,
          row.slika,
          row.vreme,
          row.br_pregleda
        )
      );
    }catch{
      return [];
    }
	}

	async getByTime(): Promise<Vest[]> {
		try{
      const query = `
        SELECT id, autor_id, naslov, tekst, slika, vreme, br_pregleda
        FROM vesti
        ORDER BY vreme DESC
      `;
      
      const [rows] = await db.execute<RowDataPacket[]>(query);

      return rows.map(
        (row) => new Vest(
          row.id,
          row.autorId,
          row.naslov,
          row.tekst,
          row.slika,
          row.vreme,
          row.br_pregleda
        )
      );
    }catch(err){
      return [];
    }
	}

	async update(vest: Vest): Promise<Vest> {
		try{
      const query = `
        UPDATE vesti
        SET autor_id = ?, naslov = ?, tekst = ?, slika = ?, vreme = ?, br_pregleda = ?
        WHERE id = ?
      `;

      const [result] = await db.execute<ResultSetHeader>(query, [
        vest.autorId,
        vest.naslov,
        vest.tekst,
        vest.slika,
        vest.vreme,
        vest.br_pregleda,
        vest.id,
      ]);

      if (result.affectedRows > 0) {
        return vest;
      }

      return new Vest();  
    }catch{
      return new Vest();
    }
	}

	async delete(id: number): Promise<boolean> {
		try{
      const query = `
        DELETE FROM vesti
        WHERE id = ?
      `;

      const [result] = await db.execute<ResultSetHeader>(query, [id]);

      return result.affectedRows > 0;
    }catch{
      return false;
    }
	}
}