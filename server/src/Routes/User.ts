import { Router } from "express";
import { pool } from "../db_upiti";                
import { requireAuth, getUser } from "../Middleware/Auth";

const router = Router();

router.get("/me", requireAuth, async (req, res) => {
  const u = getUser(req);
  if (!u) return res.status(401).json({ error: "No token" });

  try {
    const [rows] = await pool.query(
      "SELECT id, ime, prezime, mejl, uloga FROM users WHERE id = ? LIMIT 1",
      [u.id]
    );
    const me = (rows as any[])[0];
    if (!me) return res.status(404).json({ error: "User not found" });
    return res.json(me);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

router.put("/me", requireAuth, async (req, res) => {
  const u = getUser(req);
  if (!u) return res.status(401).json({ error: "No token" });

  const { ime, prezime } = req.body ?? {};
  try {
    await pool.execute(
      "UPDATE users SET ime = COALESCE(?, ime), prezime = COALESCE(?, prezime) WHERE id = ?",
      [ime ?? null, prezime ?? null, u.id]
    );
    return res.json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

router.get("/me/stats", requireAuth, async (req, res) => {
  const u = getUser(req);
  if (!u) return res.status(401).json({ error: "No token" });

  try {
    const [[v]] = (await pool.query("SELECT COUNT(*) AS count FROM vesti WHERE autor_id = ?", [u.id])) as any;
    const [[k]] = (await pool.query("SELECT COUNT(*) AS count FROM comments WHERE autor_id = ?", [u.id])) as any;
    return res.json({ vesti: v?.count ?? 0, komentari: k?.count ?? 0 });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;
