// src/middleware/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "aerocode-secret";

export interface AuthRequest extends Request {
  user?: { id: number; usuario: string; permissao: string };
}

export function ensureAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) return res.status(401).json({ error: "Não autorizado" });
  const token = auth.split(" ")[1];
  try {
    const payload: any = jwt.verify(token, JWT_SECRET);
    req.user = { id: Number(payload.sub), usuario: payload.usuario, permissao: payload.permissao };
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
}

export function ensurePermission(required: string) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ error: "Não autorizado" });
    const userPerm = (req.user.permissao || "").toUpperCase();
    const need = (required || "").toUpperCase();
    if (userPerm === need || userPerm === "ADMIN") {
      // admin tem permissão para tudo
      return next();
    }
    return res.status(403).json({ error: "Permissão negada" });
  };
}
