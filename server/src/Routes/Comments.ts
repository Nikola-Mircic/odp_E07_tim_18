import { Router } from "express";
import { pool } from "../db_upiti";
import { requireAuth, getUser } from "../Middleware/Auth";

const router = Router();

// GET /api/vesti/:vestId/komentari — lista komentara za vest (bez tokena)
router.get("/vesti/:vestId/komentari", async (req, res) => {
  const vestId = Number(req.params.vestId);
  if (!Number.isFinite(vestId)) return res.status(400).json({ error: "Nevažeći vestId" });

  try {
    const [rows] = await pool.query(
      `SELECT c.id, c.autor_id, CONCAT(u.ime, ' ', u.prezime) AS autor,
              c.tekst, c.vreme
       FROM comments c
       JOIN users u ON u.id = c.autor_id
       WHERE c.vest_id = ?
       ORDER BY c.vreme ASC`,
      [vestId]
    );
    return res.json(rows);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Greška pri čitanju komentara" });
  }
});

// POST /api/komentari — dodaj komentar (zahteva token)
router.post("/komentari", requireAuth, async (req, res) => {
  const u = getUser(req);
  const { vestId, tekst } = req.body ?? {};
  if (!u) return res.status(401).json({ error: "No token" });
  if (!vestId || !tekst) return res.status(400).json({ error: "vestId i tekst su obavezni" });

  try {
    await pool.execute(
      "INSERT INTO comments (autor_id, vest_id, tekst, vreme) VALUES (?, ?, ?, NOW())",
      [u.id, vestId, tekst]
    );
    return res.status(201).json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Greška pri dodavanju komentara" });
  }
});

// PUT /api/komentari/:id — izmeni komentar (autor ili admin/editor)
router.put("/komentari/:id", requireAuth, async (req, res) => {
  const u = getUser(req);
  const id = Number(req.params.id);
  const { tekst } = req.body ?? {};
  if (!u) return res.status(401).json({ error: "No token" });
  if (!id || !tekst) return res.status(400).json({ error: "Nevažeći id ili prazan tekst" });

  try {
    const [[row]]: any = await pool.query(
      "SELECT autor_id FROM comments WHERE id = ? LIMIT 1",
      [id]
    );
    if (!row) return res.status(404).json({ error: "Komentar ne postoji" });

    const can = row.autor_id === u.id || u.uloga === "admin" || u.uloga === "editor";
    if (!can) return res.status(403).json({ error: "Zabranjeno" });

    await pool.execute("UPDATE comments SET tekst = ? WHERE id = ?", [tekst, id]);
    return res.json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Greška pri izmeni komentara" });
  }
});

// DELETE /api/komentari/:id — obriši komentar (autor ili admin/editor)
router.delete("/komentari/:id", requireAuth, async (req, res) => {
  const u = getUser(req);
  const id = Number(req.params.id);
  if (!u) return res.status(401).json({ error: "No token" });
  if (!id) return res.status(400).json({ error: "Nevažeći id" });

  try {
    const [[row]]: any = await pool.query(
      "SELECT autor_id FROM comments WHERE id = ? LIMIT 1",
      [id]
    );
    if (!row) return res.status(404).json({ error: "Komentar ne postoji" });

    const can = row.autor_id === u.id || u.uloga === "admin" || u.uloga === "editor";
    if (!can) return res.status(403).json({ error: "Zabranjeno" });

    await pool.execute("DELETE FROM comments WHERE id = ?", [id]);
    return res.json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Greška pri brisanju komentara" });
  }
});

export default router;
