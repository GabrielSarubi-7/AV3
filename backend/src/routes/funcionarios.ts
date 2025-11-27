// src/routes/funcionarios.ts
import { Router } from "express";
import bcrypt from "bcrypt";
import prisma from "../prismaClient";
import { ensureAuth, ensurePermission } from "../middleware/auth";

const router = Router();

// lista (qualquer usuário autenticado pode ver; se quiser público, remova ensureAuth)
router.get("/", ensureAuth, async (req, res) => {
  try {
    const items = await prisma.funcionario.findMany({ orderBy: { id: "desc" }});
    // não retornar senha
    const safe = items.map(({ senha, ...rest }) => rest);
    res.json(safe);
  } catch (e) { console.error(e); res.status(500).json({ error: "Erro ao listar funcionários" }); }
});

// criar -> apenas ADMINISTRADOR
router.post("/", ensureAuth, ensurePermission("ADMINISTRADOR"), async (req, res) => {
  try {
    const { nome, telefone, endereco, usuario, senha, permissao } = req.body;
    if(!nome || !usuario || !senha || !permissao) return res.status(400).json({ error: "Campos obrigatórios faltando" });

    const hash = await bcrypt.hash(senha, 10);
    const created = await prisma.funcionario.create({
      data: { nome, telefone, endereco, usuario, senha: hash, permissao }
    });
    const { senha: _s, ...userSafe } = created;
    res.status(201).json(userSafe);
  } catch (e) { console.error(e); res.status(500).json({ error: "Erro ao criar funcionário" }); }
});

// buscar por id
router.get("/:id", ensureAuth, async (req, res) => {
  const id = Number(req.params.id);
  try {
    const item = await prisma.funcionario.findUnique({ where: { id }});
    if (!item) return res.status(404).json({ error: "Funcionário não encontrado" });
    const { senha: _s, ...userSafe } = item;
    res.json(userSafe);
  } catch (e) { console.error(e); res.status(500).json({ error: "Erro ao buscar funcionário" }); }
});

// atualizar -> somente ADMINISTRADOR
router.put("/:id", ensureAuth, ensurePermission("ADMINISTRADOR"), async (req, res) => {
  const id = Number(req.params.id);
  try {
    const data = { ...req.body };
    if (data.senha) {
      data.senha = await bcrypt.hash(data.senha, 10);
    }
    const updated = await prisma.funcionario.update({ where: { id }, data });
    const { senha: _s, ...userSafe } = updated;
    res.json(userSafe);
  } catch (e) { console.error(e); res.status(500).json({ error: "Erro ao atualizar funcionário" }); }
});

// deletar -> somente ADMINISTRADOR
router.delete("/:id", ensureAuth, ensurePermission("ADMINISTRADOR"), async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.funcionario.delete({ where: { id }});
    res.status(204).send();
  } catch (e) { console.error(e); res.status(500).json({ error: "Erro ao deletar funcionário" }); }
});

export default router;
