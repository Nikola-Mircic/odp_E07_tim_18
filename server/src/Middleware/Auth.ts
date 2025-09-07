import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export type TokenPayload = {
  id: number;
  uloga: string;
  korisnickoIme?: string;
  iat?: number;
  exp?: number;
};

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: "No token" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET ?? "dev-secret") as TokenPayload;
    (req as any).user = payload;
    return next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}

export function optionalAuth(req: Request, _res: Response, next: NextFunction) {
  const auth = req.headers.authorization ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;

  if (!token) return next();

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET ?? "dev-secret") as TokenPayload;
    (req as any).user = payload;
  } catch {
  }
  return next();
}

export function getUser(req: Request): TokenPayload | undefined {
  return (req as any).user as TokenPayload | undefined;
}
