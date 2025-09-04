-- Kreiranje baze podataka

CREATE DATABASE IF NOT EXISTS projekat_odp_db;

-- Koriscenje default baze podataka
USE projekat_odp_db;

-- Kreiranje tabele za vesti, tagove i korisnike
CREATE TABLE vesti IF NOT EXISTS (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    autor_id INT NOT NULL,
    naslov VARCHAR(60) NOT NULL,
    tekst TEXT NOT NULL,
    slika VARCHAR(20),
    vreme DATETIME NOT NULL,
    br_pregleda INT DEFAULT 0
);
 
CREATE TABLE tags IF NOT EXISTS (
	id_vesti INT NOT NULL,
  naziv VARCHAR(20) NOT NULL
);

-- Osiguranje da isti tag ne moze biti dodat vise puta za istu vest
ALTER TABLE tags ADD UNIQUE `unique_index`(`id_vesti`, `naziv`);

-- Tabela za korisnike --
CREATE TABLE users IF NOT EXISTS (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    uloga VARCHAR(20) DEFAULT false,
    ime VARCHAR(20) NOT NULL,
    prezime VARCHAR(20) NOT NULL,
    mejl VARCHAR(30) NOT NULL,
    lozinka VARCHAR(64) NOT NULL
);

-- Tabela za komentare
 --
CREATE TABLE comments IF NOT EXISTS (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    autor_id INT NOT NULL,
    vest_id INT NOT NULL,
    tekst TEXT NOT NULL,
    vreme DATETIME NOT NULL
);

-- Unos podataka u tabele - primeri
-- Korisnici
INSERT INTO users(uloga, ime, prezime, mejl, lozinka)
VALUES ('urednik', "Nikola", "Ljajic", "ljajic@newsstud.com", "$2b$10$.omjoIy7s203S14EJ9z1IuEJ39vk9Fqk2Tr/g2UvpTgQHZPs43m1K");
INSERT INTO users(uloga, ime, prezime, mejl, lozinka)
VALUES ('citalac', "Nikola", "Mircic", "mircic@newsstud.com", "$2b$10$f0avo75kgBoxxirOaKz9SeaNxkbVCAZqTXQBfxW/BZf9Z4hW.cW6G");

-- Vesti
INSERT INTO vesti (autor_id, naslov, tekst, slika, vreme)
VALUES (1, "Vest 1", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tempus nisl et volutpat blandit. Praesent tincidunt lorem semper egestas feugiat. Fusce eget erat sagittis, faucibus felis a, tincidunt est. Nunc. ", "", "2025-08-22 18:43:12");
INSERT INTO vesti (autor_id, naslov, tekst, slika, vreme)
VALUES (0, "Vest 2", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tempus nisl et volutpat blandit. Praesent tincidunt lorem semper egestas feugiat. Fusce eget erat sagittis, faucibus felis a, tincidunt est. Nunc. ", "", "2025-07-21 18:30:12");
INSERT INTO vesti (autor_id, naslov, tekst, slika, vreme)
VALUES (1, "Vest 3", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tempus nisl et volutpat blandit. Praesent tincidunt lorem semper egestas feugiat. Fusce eget erat sagittis, faucibus felis a, tincidunt est. Nunc. ", "", "2025-07-18 15:13:12");
INSERT INTO vesti (autor_id, naslov, tekst, slika, vreme)
VALUES (0, "Vest 4", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tempus nisl et volutpat blandit. Praesent tincidunt lorem semper egestas feugiat. Fusce eget erat sagittis, faucibus felis a, tincidunt est. Nunc. ", "", "2025-07-05 12:37:12");

-- Tagovi
INSERT INTO tags (id_vesti, naziv)
VALUES (1, "sport");
INSERT INTO tags (id_vesti, naziv)
VALUES (1, "kultura");
INSERT INTO tags (id_vesti, naziv)
VALUES (1, "fudbal");

INSERT INTO tags (id_vesti, naziv)
VALUES (2, "univerziteti");
INSERT INTO tags (id_vesti, naziv)
VALUES (2, "odp");
INSERT INTO tags (id_vesti, naziv)
VALUES (2, "fudbal");
INSERT INTO tags (id_vesti, naziv)

VALUES (3, "univerziteti");
INSERT INTO tags (id_vesti, naziv)
VALUES (3, "odp");
INSERT INTO tags (id_vesti, naziv)
VALUES (3, "projekat");

INSERT INTO tags (id_vesti, naziv)
VALUES (4, "sport");
INSERT INTO tags (id_vesti, naziv)
VALUES (4, "world cup");
INSERT INTO tags (id_vesti, naziv)
VALUES (4, "fudbal");

-- Komentari --
-- Svaka vest ima po dva komentara --
INSERT INTO comments ( autor_id, vest_id, tekst, vreme )
VALUES ( 4, 1, "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "2025-07-05 12:37:12");
INSERT INTO comments ( autor_id, vest_id, tekst, vreme )
VALUES ( 3, 1, "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "2025-07-05 12:37:12");
INSERT INTO comments ( autor_id, vest_id, tekst, vreme )
VALUES ( 4, 2, "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "2025-07-05 12:37:12");
INSERT INTO comments ( autor_id, vest_id, tekst, vreme )
VALUES ( 3, 2, "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "2025-07-05 12:37:12");
INSERT INTO comments ( autor_id, vest_id, tekst, vreme )
VALUES ( 4, 3, "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "2025-07-05 12:37:12");
INSERT INTO comments ( autor_id, vest_id, tekst, vreme )
VALUES ( 3, 3, "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "2025-07-05 12:37:12");
INSERT INTO comments ( autor_id, vest_id, tekst, vreme )
VALUES ( 4, 4, "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "2025-07-05 12:37:12");
INSERT INTO comments ( autor_id, vest_id, tekst, vreme )
VALUES ( 3, 4, "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "2025-07-05 12:37:12");