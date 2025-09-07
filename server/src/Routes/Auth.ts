import { Router } from "express";
import { AuthService } from "../Services/auth/AuthService";
import { UserRepository } from "../Infrastructure/repositories/users/UserRepository";

const router = Router();
const auth = new AuthService(new UserRepository());

// POST /api/login
router.post("/login", async (req, res) => {
  try {
    const mejl = String(req.body?.email ?? req.body?.mejl ?? "").trim().toLowerCase();
    const lozinka = String(req.body?.password ?? req.body?.lozinka ?? "");

    if (!mejl || !lozinka) {
      return res.status(400).json({ error: "email i password su obavezni" });
    }

    const token = await auth.prijava(mejl, lozinka);
    if (!token) return res.status(401).json({ error: "Pogrešan mejl ili lozinka" });

    return res.json({ token });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Greška na serveru" });
  }
});

// POST /api/register
router.post("/register", async (req, res) => {
  try {
    const dto = {
      uloga: req.body?.uloga ?? "user",
      ime: String(req.body?.ime ?? ""),
      prezime: String(req.body?.prezime ?? ""),
      mejl: String(req.body?.email ?? req.body?.mejl ?? "").trim().toLowerCase(),
      lozinka: String(req.body?.password ?? req.body?.lozinka ?? ""),
    };

    if (!dto.ime || !dto.prezime || !dto.mejl || !dto.lozinka) {
      return res.status(400).json({ error: "ime, prezime, email i password su obavezni" });
    }

    const token = await auth.registracija(dto);
    if (!token) return res.status(409).json({ error: "Korisnik već postoji" });

    return res.status(201).json({ token });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Greška na serveru" });
  }
});

export default router;
