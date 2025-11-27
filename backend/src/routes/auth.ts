// src/routes/auth.ts
import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../prismaClient";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "aerocode-secret";


// login
router.post("/login", async (req, res) => {
    const { usuario, senha } = req.body;
    if (!usuario || !senha) return res.status(400).json({ error: "Usuário e senha são obrigatórios" });

    try {
        const user = await prisma.funcionario.findUnique({ where: { usuario } });
        if (!user) return res.status(401).json({ error: "Credenciais inválidas" });

        const match = await bcrypt.compare(senha, user.senha);
        if (!match) return res.status(401).json({ error: "Credenciais inválidas" });

        const token = jwt.sign(
            { sub: user.id, usuario: user.usuario, permissao: user.permissao },
            JWT_SECRET,
        );

        const { senha: _s, ...userSafe } = user;
        return res.json({ token, user: userSafe });
    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ error: "Erro interno" });
    }
});

router.get("/me", async (req, res) => {
    const auth = req.headers.authorization;
    if (!auth?.startsWith("Bearer ")) return res.status(401).json({ error: "Não autorizado" });
    const token = auth.split(" ")[1];
    try {
        const payload: any = jwt.verify(token, JWT_SECRET);
        const user = await prisma.funcionario.findUnique({ where: { id: Number(payload.sub) } });
        if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
        const { senha: _s, ...userSafe } = user;
        return res.json({ user: userSafe });
    } catch (err) {
        return res.status(401).json({ error: "Token inválido" });
    }
});

export default router;
